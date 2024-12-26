import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowLeftRightIcon, PlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import TransactionsFilters from "./_components/filters";
import { deleteAction } from "./actions";

export default async function Transaction({
  searchParams,
}: {
  readonly searchParams: Promise<{
    q: string;
    transactedAt: string;
    page: string;
  }>;
}) {
  const t = await getTranslations();
  const { q, transactedAt, page } = await searchParams;
  const pagination = await BackendFacade.transactions.page({
    transactedAt,
    q,
    page: parseInt(page || "1"),
  });

  return (
    <GenericPage
      title={t("menu.transactions")}
      icon={<ArrowLeftRightIcon />}
      actions={<TransactionsFilters q={q} transactedAt={transactedAt} />}
    >
      <div className="flex flex-row justify-end gap-2">
        <Link href={"/transactions/new"}>
          <Button variant={"success"} size={"xs"}>
            <PlusIcon /> {t("crud.new")}
          </Button>
        </Link>
      </div>

      <GenericList
        data={pagination.data}
        fields={[
          { key: "description", position: "left", label: "crud.description" },
          {
            key: "category.title",
            label: "transactions.category",
          },
          {
            key: "output.title",
            label: "transactions.paidFrom",
          },
          {
            key: "input.title",
            label: "transactions.receivedIn",
          },
          {
            key: "transactedAt",
            label: "transactions.transactedAt",
            process: "date",
          },
          {
            key: "value",
            position: "right",
            label: "transactions.value",
            class: "text-nowrap",
            process: "monetary",
          },
        ]}
        lastPage={pagination.lastPage}
        page={pagination.page}
        editPath="/transactions/edit/[id]"
        actionDelete={deleteAction}
      />
    </GenericPage>
  );
}
