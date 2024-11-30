import BackendFacade from "@/backend";
import AccountsForm from "../../form";
import { redirect } from "@/i18n/routing";

export default async function AccountsNew({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const item = await BackendFacade.accounts.byId(parseInt(id));
  if (!item) redirect({ href: "/accounts", locale });

  return <AccountsForm data={item} />;
}
