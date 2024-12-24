"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/core/models/Account";
import { TransactionMonthlySummary } from "@/core/models/Report";
import { useRouter } from "@/i18n/routing";
import { ChartPieIcon } from "lucide-react";
import GenericSelect from "./generic-select";
import { MonthlySummary } from "./monthly-summary";

export default function WidgetTransaction({
  title = "menu.report",
  data,
  account,
  accounts,
  children,
}: Readonly<{
  title?: string;
  data: TransactionMonthlySummary[];
  account?: number;
  accounts?: Account[];
  children?: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2 justify-between items-center">
          <div className="flex flex-row gap-2">
            <ChartPieIcon />
            <span>{title}</span>
          </div>
          {accounts && (
            <div className="-my-3">
              <GenericSelect
                nullable
                value={(account ?? 0)?.toString()}
                items={[
                  { label: "Todas as contas", value: "0" },
                  ...accounts.map((item) => ({
                    label: item.title,
                    value: item.id,
                  })),
                ]}
                onChange={(value) => {
                  router.replace(`/?account=${value}`);
                }}
              />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-right text-white">
        <MonthlySummary data={data} />
      </CardContent>
      {children && (
        <CardFooter className="flex flex-row justify-end gap-2">
          {children}
        </CardFooter>
      )}
    </Card>
  );
}
