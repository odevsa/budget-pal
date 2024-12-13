import BackendFacade from "@/backend";
import TransactionsForm from "../../form";
import { redirect } from "@/i18n/routing";

export default async function TransactionsNew({
  params,
}: Readonly<{
  params: Promise<{ locale: string; id: string }>;
}>) {
  const { locale, id } = await params;
  const item = await BackendFacade.transactions.byId(parseInt(id));
  if (!item) redirect({ href: "/transactions", locale });

  const accounts = await BackendFacade.accounts.all();

  return <TransactionsForm data={item} accounts={accounts} />;
}
