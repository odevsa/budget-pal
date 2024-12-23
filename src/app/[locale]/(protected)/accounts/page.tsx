import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { PlusIcon, WalletIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import GenericSearch from "../_components/generic-search";
import { deleteAction } from "./actions";

export default async function Accounts({
  searchParams,
}: {
  readonly searchParams: Promise<{ q: string; page: string }>;
}) {
  const t = await getTranslations();
  const { q, page } = await searchParams;
  const pagination = await BackendFacade.accounts.page({
    q,
    page: parseInt(page || "1"),
  });

  return (
    <GenericPage
      title={t("menu.accounts")}
      icon={<WalletIcon />}
      actions={
        <>
          <GenericSearch q={q} />

          <Link href={"/accounts/new"}>
            <Button variant={"success"}>
              <PlusIcon /> {t("crud.new")}
            </Button>
          </Link>
        </>
      }
    >
      <GenericList
        data={pagination.data}
        fields={[{ key: "title", position: "left", label: "crud.title" }]}
        lastPage={pagination.lastPage}
        page={pagination.page}
        editPath="/accounts/edit/[id]"
        actionDelete={deleteAction}
      />
    </GenericPage>
  );
}
