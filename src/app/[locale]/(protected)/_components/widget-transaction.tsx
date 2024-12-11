import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/core/models/Transaction";
import { ChartPieIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function WidgetTransaction({
  title = "menu.report",
  variant = TransactionType.Transfer,
  children,
}: Readonly<{
  title?: string;
  variant?: TransactionType;
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
      <CardContent className="text-right text-white">Relatório</CardContent>
      {children && (
        <CardFooter className="flex flex-row justify-end gap-2">
          {children}
        </CardFooter>
      )}
    </Card>
  );
}
