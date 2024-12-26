"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/core/models/Account";
import { Category } from "@/core/models/Category";
import { Invoice } from "@/core/models/Invoice";
import { TransactionType } from "@/core/models/Transaction";
import { ReceiptIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TransactionDialogForm from "../transactions/dialog-form";
import GenericList from "./generic-list";

export default function WidgetInvoice({
  accounts,
  categories,
  type,
  title = "menu.invoices",
  data,
}: Readonly<{
  accounts: Account[];
  categories: Category[];
  type: TransactionType.Pay | TransactionType.Receive;
  title?: string;
  data: Invoice[];
}>) {
  const t = useTranslations();

  const [invoice, setInvoice] = useState<Invoice>();

  const getTransactedTitle = () => {
    if (type == TransactionType.Receive) return "transactions.receive";
    return "transactions.pay";
  };

  const getTransactedLabel = () => {
    if (type == TransactionType.Receive) return "invoices.received";
    return "invoices.paid";
  };

  const handleOpenChange = (opened: boolean) => {
    if (!opened) setInvoice(undefined);
  };

  return (
    <Card>
      <TransactionDialogForm
        open={!!invoice}
        invoice={invoice}
        onOpenChange={handleOpenChange}
        variant={TransactionType.Pay}
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
      <CardContent className="text-white">
        {data.length ? (
          <GenericList
            data={data.map((item) => ({
              ...item,
              hasTransaction: item.transactions?.length,
              hideAction: item.transactions?.length,
            }))}
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
            actions={
              [
                // {
                //   title: t("transactions.pay"),
                //   element: <ReceiptIcon />,
                //   onClick: setInvoice,
                // },
              ]
            }
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
