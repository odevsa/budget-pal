import BackendFacade from "@/backend";
import { Account } from "@/core/models/Account";
import PageTitle from "../_components/page-title";
import GenericList from "../_components/generic-list";

export default async function Accounts() {
  const list: Account[] = await BackendFacade.accounts.list();

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle>Accounts</PageTitle>

      <GenericList data={list} />
    </div>
  );
}
