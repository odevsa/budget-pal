import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { PlusIcon, TagIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import GenericSearch from "../_components/generic-search";
import { deleteAction } from "./actions";

export default async function Categories({
  searchParams,
}: {
  readonly searchParams: Promise<{ q: string; page: string }>;
}) {
  const t = await getTranslations();
  const { q, page } = await searchParams;
  const pagination = await BackendFacade.categories.page({
    q,
    page: parseInt(page || "1"),
  });

  return (
    <GenericPage
      title={t("menu.categories")}
      icon={<TagIcon />}
      actions={<GenericSearch q={q} />}
    >
      <div className="flex flex-row justify-end gap-2">
        <Link href={"/categories/new"}>
          <Button variant={"success"} size={"xs"}>
            <PlusIcon /> {t("crud.new")}
          </Button>
        </Link>
      </div>

      <GenericList
        data={pagination.data}
        fields={[{ key: "title", position: "left", label: "crud.title" }]}
        lastPage={pagination.lastPage}
        page={pagination.page}
        editPath="/categories/edit/[id]"
        actionDelete={deleteAction}
      />
    </GenericPage>
  );
}
