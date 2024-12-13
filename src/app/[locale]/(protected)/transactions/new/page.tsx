import BackendFacade from "@/backend";
import TransactionsForm from "../form";

export default async function TransactionsNew() {
  const accounts = await BackendFacade.accounts.all();
  const categories = await BackendFacade.categories.all();

  return <TransactionsForm accounts={accounts} categories={categories} />;
}
