import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowLeftRightIcon, PlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import GenericSearch from "../_components/generic-search";
import { deleteAction } from "./actions";

export default async function Transaction({
  searchParams,
}: {
  readonly searchParams: Promise<{ q: string; page: string }>;
}) {
  const t = await getTranslations();
  const { q, page } = await searchParams;
  const pagination = await BackendFacade.transactions.page({
    q,
    page: parseInt(page || "1"),
  });

  return (
    <GenericPage
      title={t("menu.transactions")}
      icon={<ArrowLeftRightIcon />}
      actions={
        <>
          <GenericSearch q={q} />

          <Link href={"/transactions/new"}>
            <Button variant={"success"}>
              <PlusIcon /> {t("crud.new")}
            </Button>
          </Link>
        </>
      }
    >
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
