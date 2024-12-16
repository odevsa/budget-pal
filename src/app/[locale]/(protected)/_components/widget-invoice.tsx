"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/core/models/Invoice";
import { ReceiptIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import GenericList from "./generic-list";
import { TransactionType } from "@/core/models/Transaction";

export default function WidgetInvoice({
  type,
  title = "menu.invoices",
  data,
}: Readonly<{
  type: TransactionType.Pay | TransactionType.Receive;
  title?: string;
  data: Invoice[];
}>) {
  const t = useTranslations();

  const getTransactedTitle = () => {
    if (type == TransactionType.Receive) return "transactions.receive";
    return "transactions.pay";
  };

  const getTransactedLabel = () => {
    if (type == TransactionType.Receive) return "invoices.received";
    return "invoices.paid";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          <ReceiptIcon />
          <span>{t(title)}</span>
          <span className="text-muted-foreground font-light">
            ({t(getTransactedTitle())})
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
          />
        ) : (
          <div className="text-center">Não há itens</div>
        )}
      </CardContent>
    </Card>
  );
}
