import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function GenericWidget({
  title,
  icon,
  value,
}: Readonly<{
  title: string;
  icon?: React.ReactElement;
  value: string;
}>) {
  const t = await getTranslations();
  return (
    <Card className="relative">
      <div className="absolute right-5 opacity-10 h-full py-5 flex flex-row justify-end items-center text-9xl">
        {icon}
      </div>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          <span className="h-6">{icon}</span>
          <span>{t(title)}</span>
        </CardTitle>
        <CardDescription className="text-white">
          <span className="text-7xl">
            <Link href="/accounts">{value}</Link>
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
