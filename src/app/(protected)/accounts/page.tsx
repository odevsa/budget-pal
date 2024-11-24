import BackendFacade from "@/backend";
import { Button } from "@/components/ui/button";
import { PlusIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import GenericList from "../_components/generic-list";
import GenericPage from "../_components/generic-page";
import { deleteAction } from "./actions";

export default async function Accounts() {
  const list = await BackendFacade.accounts.list();

  return (
    <GenericPage
      title="Accounts"
      icon={<WalletIcon />}
      actions={
        <Link href={"/accounts/new"}>
          <Button variant={"success"} size={"xs"}>
            <PlusIcon /> New
          </Button>
        </Link>
      }
    >
      <GenericList
        data={list}
        editPath="/accounts/edit/[id]"
        actionDelete={deleteAction}
      />
    </GenericPage>
  );
}
