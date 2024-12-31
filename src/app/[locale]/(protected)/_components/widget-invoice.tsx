"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/core/models/Account";
import { Category } from "@/core/models/Category";
import { Invoice } from "@/core/models/Invoice";
import { TransactionType } from "@/core/models/Transaction";
import { ReceiptIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import TransactionDialogForm from "../transactions/dialog-form";
import GenericList from "./generic-list";

export default function WidgetInvoice({
  accounts,
  categories,
  variant,
  title = "menu.invoices",
  data,
}: Readonly<{
  accounts: Account[];
  categories: Category[];
  variant: TransactionType.InvoicePay | TransactionType.InvoiceReceive;
  title?: string;
  data: Invoice[];
}>) {
  const t = useTranslations();

  const [invoice, setInvoice] = useState<Invoice>();
  const [dialogOpened, setDialogOpened] = useState<boolean>();
  const [internalData, setInternalData] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoice(undefined);
    setDialogOpened(false);
    setInternalData(
      data.map(
        (item: Invoice) =>
          ({
            ...item,
            value:
              (item.transactions?.length ?? 0) > 0
                ? item.transactions?.[0].value
                : item.value,
          } as Invoice)
      )
    );
  }, [data]);

  const getTransactedTitle = () => {
    if (variant == TransactionType.InvoiceReceive)
      return "transactions.receive";
    return "transactions.pay";
  };

  const getTransactedLabel = () => {
    if (variant == TransactionType.InvoiceReceive) return "invoices.received";
    return "invoices.paid";
  };

  const handleAction = (item: Invoice) => {
    setInvoice(item);
    setDialogOpened(true);
  };

  const handleOpenChange = (opened: boolean) => {
    setDialogOpened(opened);
    if (!opened) setInvoice(undefined);
  };

  return (
    <Card>
      <TransactionDialogForm
        open={dialogOpened}
        invoice={invoice}
        onOpenChange={handleOpenChange}
        variant={variant}
        accounts={accounts}
        categories={categories}
      />
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          <ReceiptIcon />
          <span>{t(title)}</span>
          <span className="text-muted-foreground font-light">
            ({t(getTransactedTitle())}) {invoice?.id}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        {internalData.length ? (
          <GenericList
            data={internalData.map((item: Invoice) => ({
              ...item,
              hasTransaction: item.transactions?.length,
            }))}
            actionDisplayCondition={(item) => !item.hasTransaction}
            fields={[
              { key: "title", label: "crud.title", position: "left" },
              {
                key: "hasTransaction",
                label: getTransactedLabel(),
                process: "boolean",
              },
              {
                key: "value",
                label: "invoices.value",
                process: "monetary",
                position: "right",
              },
            ]}
            actions={[
              {
                title: t("transactions.pay"),
                element: <ReceiptIcon />,
                onClick: handleAction,
              },
            ]}
          />
        ) : (
          <div className="text-center border-y-2 border-gray-500">
            {t("crud.thereAreNoItems")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
