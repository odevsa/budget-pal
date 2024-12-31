"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/core/models/Account";
import { Transaction } from "@/core/models/Transaction";
import { useRouter } from "@/i18n/routing";
import { ArrowLeftRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GenericPage from "../_components/generic-page";
import TransactionsFormContent from "./form-content";
import { Category } from "@/core/models/Category";
import { InvoiceTransaction } from "@/core/models/InvoiceTransaction";

export default function TransactionsForm({
  accounts,
  categories,
  data,
}: Readonly<{
  accounts: Account[];
  categories: Category[];
  data?: Transaction;
}>) {
  const t = useTranslations();
  const router = useRouter();
  const [internalData, setInternalData] = useState<Transaction | undefined>(
    data
  );

  useEffect(() => {
    setInternalData({
      ...data,
      invoiceTransaction:
        data?.invoices && data.invoices.length > 0
          ? ({ invoice: data.invoices[0] } as InvoiceTransaction)
          : undefined,
    } as Transaction);
  }, [data]);

  const backToList = () => {
    router.push("/transactions");
  };

  return (
    <GenericPage title={t("menu.transactions")} icon={<ArrowLeftRightIcon />}>
      <Card>
        <CardHeader>
          <CardTitle>
            {!internalData?.id ? t("crud.create") : t("crud.edit")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <TransactionsFormContent
            data={internalData}
            accounts={accounts}
            categories={categories}
            onCancel={backToList}
            onSuccess={backToList}
          />
        </CardContent>
      </Card>
    </GenericPage>
  );
}
