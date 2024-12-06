import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { PlusIcon, ReceiptIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import GenericSearch from "../_components/generic-search";
import { deleteAction } from "./actions";

export default async function Invoices({
  searchParams,
}: {
  readonly searchParams: Promise<{ q: string; page: string }>;
}) {
  const t = await getTranslations();
  const { q, page } = await searchParams;
  const pagination = await BackendFacade.invoices.all({
    q,
    page: parseInt(page || "1"),
  });

  return (
    <GenericPage
      title={t("menu.invoices")}
      icon={<ReceiptIcon />}
      actions={
        <>
          <GenericSearch q={q} />

          <Link href={"/invoices/new"}>
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
          { key: "id", position: "left", label: "crud.id" },
          { key: "title", position: "left", label: "crud.title" },
          { key: "isInput", label: "invoices.isInput", process: "boolean" },
          { key: "isActive", label: "invoices.isActive", process: "active" },
          {
            key: "value",
            position: "right",
            label: "invoices.value",
            class: "text-nowrap",
            process: "monetary",
          },
        ]}
        lastPage={pagination.lastPage}
        page={pagination.page}
        editPath="/invoices/edit/[id]"
        actionDelete={deleteAction}
      />
    </GenericPage>
  );
}
