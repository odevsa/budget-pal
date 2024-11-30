import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboardIcon, TagIcon, WalletIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageTitle from "../_components/page-title";
import BackendFacade from "@/backend";
import { Link } from "@/i18n/routing";

export default async function Panel() {
  const t = await getTranslations();
  const amountAccounts = await BackendFacade.accounts.total();
  const amountCategories = await BackendFacade.categories.total();

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.dashboard")} icon={<LayoutDashboardIcon />} />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row gap-2">
              <WalletIcon />
              <span>{t("menu.accounts")}</span>
            </CardTitle>
            <CardDescription className="text-right text-white">
              <span className="text-7xl">
                <Link href="/accounts">{amountAccounts}</Link>
              </span>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row gap-2">
              <TagIcon />
              <span>{t("menu.categories")}</span>
            </CardTitle>
            <CardDescription className="text-right text-white">
              <span className="text-7xl">
                <Link href="/categories">{amountCategories}</Link>
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
