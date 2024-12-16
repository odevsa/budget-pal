import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionMonthlySummary } from "@/core/models/Report";
import { ChartPieIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MonthlySummary } from "./monthly-summary";

export default async function WidgetTransaction({
  title = "menu.report",
  data,
  children,
}: Readonly<{
  title?: string;
  data: TransactionMonthlySummary[];
  children?: React.ReactNode;
}>) {
  const t = await getTranslations();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          <ChartPieIcon />
          <span>{t(title)}</span>
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
