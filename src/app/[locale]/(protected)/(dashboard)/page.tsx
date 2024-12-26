import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { maskCurrency } from "@/core/mask";
import { TransactionType } from "@/core/models/Transaction";
import {
  ArrowLeftRightIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  WalletIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import GenericWidget from "../_components/generic-widget";
import PageTitle from "../_components/page-title";
import WidgetInvoice from "../_components/widget-invoice";
import WidgetTransaction from "../_components/widget-transaction";
import TransactionDialogForm from "../transactions/dialog-form";

export default async function Panel({
  searchParams,
}: {
  readonly searchParams: Promise<{ account: string }>;
}) {
  const { account } = await searchParams;
  const now = new Date();
  const locale = await getLocale();
  const t = await getTranslations();
  const accounts = await BackendFacade.accounts.all();
  const categories = await BackendFacade.categories.all();
  const monthlySummary = await BackendFacade.reports.monthlySummary(
    now.getMonth() + 1,
    now.getFullYear(),
    account != "0" ? parseInt(account) : undefined
  );
  const monthlyInvoices = await BackendFacade.reports.monthlyInvoices(
    now.getMonth() + 1,
    now.getFullYear()
  );
  const monthlyInvoicesToPay = monthlyInvoices.filter(
    (invoice) => !invoice.isInput
  );
  const monthlyInvoicesToReceive = monthlyInvoices.filter(
    (invoice) => invoice.isInput
  );
  const balances = await BackendFacade.reports.balance();

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.dashboard")} icon={<LayoutDashboardIcon />} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
        <div className="col-span-full">
          <WidgetTransaction
            title={t("reports.monthly")}
            data={monthlySummary}
            account={parseInt(account ?? "0")}
            accounts={accounts}
          >
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

        {balances.map((account) => (
          <GenericWidget
            key={`account${account.id}`}
            title={t("accounts.balance")}
            description={account.title}
            value={`$ ${maskCurrency(account.balance, locale)}`}
            icon={<WalletIcon size="100%" />}
          />
        ))}

        {monthlyInvoicesToPay.length > 0 && (
          <div className="col-span-full">
            <WidgetInvoice
              accounts={accounts}
              categories={categories}
              type={TransactionType.Pay}
              data={monthlyInvoicesToPay}
            />
          </div>
        )}

        {monthlyInvoicesToReceive.length > 0 && (
          <div className="col-span-full">
            <WidgetInvoice
              accounts={accounts}
              categories={categories}
              type={TransactionType.Receive}
              data={monthlyInvoicesToReceive}
            />
          </div>
        )}
      </div>
    </div>
  );
}
