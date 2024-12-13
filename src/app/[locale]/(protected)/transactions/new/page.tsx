import BackendFacade from "@/backend";
import TransactionsForm from "../form";

export default async function TransactionsNew() {
  const accounts = await BackendFacade.accounts.all();

  return <TransactionsForm accounts={accounts} />;
}
