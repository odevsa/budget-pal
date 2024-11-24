import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { PlusIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import { deleteAction } from "./actions";
import GenericSearch from "../_components/generic-search";

export default async function Accounts({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const q = (await searchParams).q;
  const page = parseInt((await searchParams).page || "1");
  const pagination = await BackendFacade.accounts.all({ q, page });

  return (
    <GenericPage
      title="Accounts"
      icon={<WalletIcon />}
      actions={
        <>
          <GenericSearch q={q} page={page} />

          <Link href={"/accounts/new"}>
            <Button variant={"success"}>
              <PlusIcon /> New
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
