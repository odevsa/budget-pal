import BackendFacade from "@/backend";
import AccountsForm from "../../form";
import { redirect } from "next/navigation";

export default async function AccountsNew({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await BackendFacade.accounts.byId(parseInt(id));
  if (!item) redirect("/accounts");

  return <AccountsForm data={item} />;
}
