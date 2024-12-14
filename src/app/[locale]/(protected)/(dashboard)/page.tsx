import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftRightIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  TagIcon,
  WalletIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageTitle from "../_components/page-title";
import WidgetTransaction from "../_components/widget-transaction";
import TransactionDialogForm from "../transactions/dialog-form";
import { TransactionType } from "@/core/models/Transaction";
import GenericWidget from "../_components/generic-widget";

export default async function Panel() {
  const t = await getTranslations();
  const accounts = await BackendFacade.accounts.all();
  const categories = await BackendFacade.categories.all();
  const amountAccounts = accounts.length ?? 0;
  const amountCategories = categories.length ?? 0;

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.dashboard")} icon={<LayoutDashboardIcon />} />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="col-span-full">
          <WidgetTransaction title="reports.monthly">
            <TransactionDialogForm
              variant={TransactionType.Pay}
              accounts={accounts}
              categories={categories}
            >
              <Button variant={"destructive"} size={"xs"}>
                <ReceiptIcon />
                {t("transactions.pay")}
              </Button>
            </TransactionDialogForm>

            <TransactionDialogForm
              variant={TransactionType.Receive}
              accounts={accounts}
              categories={categories}
            >
              <Button variant={"success"} size={"xs"}>
                <HandCoinsIcon />
                {t("transactions.receive")}
              </Button>
            </TransactionDialogForm>

            <TransactionDialogForm accounts={accounts} categories={categories}>
              <Button variant={"outline"} size={"xs"}>
                <ArrowLeftRightIcon />
                {t("transactions.transfer")}
              </Button>
            </TransactionDialogForm>
          </WidgetTransaction>
        </div>

        <GenericWidget
          title="menu.accounts"
          icon={<WalletIcon size={"100%"} />}
          value={amountAccounts.toString()}
        />
        <GenericWidget
          title="menu.categories"
          icon={<TagIcon size={"100%"} />}
          value={amountCategories.toString()}
        />
      </div>
    </div>
  );
}
