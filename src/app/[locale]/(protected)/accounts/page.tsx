import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { PlusIcon, WalletIcon } from "lucide-react";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import GenericSearch from "../_components/generic-search";
import { deleteAction } from "./actions";
import { getTranslations } from "next-intl/server";

export default async function Accounts({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const t = await getTranslations();
  const q = (await searchParams).q;
  const page = parseInt((await searchParams).page || "1");
  const pagination = await BackendFacade.accounts.all({ q, page });

  return (
    <GenericPage
      title={t("accounts.title")}
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
        lastPage={pagination.lastPage}
        page={pagination.page}
        editPath="/accounts/edit/[id]"
        actionDelete={deleteAction}
      />
    </GenericPage>
  );
}
