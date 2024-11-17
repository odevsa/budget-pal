"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Account } from "@/core/models/Account";
import { useGenericForm } from "@/hooks/use-generic-form";
import { PlusIcon, WalletIcon } from "lucide-react";
import GenericForm from "../_components/generic-form";
import GenericList from "../_components/generic-list";
import PageTitle from "../_components/page-title";
import BackendFacade from "@/backend";

export default function Accounts() {
  const {
    list,
    form,
    setForm,
    handleSave,
    handleDelete,
    handleNew,
    handleEdit,
    handleCancel,
  } = useGenericForm<Account>(
    { title: "" },
    {
      list: BackendFacade.accounts.list,
      save: BackendFacade.accounts.save,
      delete: BackendFacade.accounts.delete,
    }
  );

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title="Accounts" icon={<WalletIcon />}>
        {!form && (
          <Button variant={"success"} size={"xs"} onClick={handleNew}>
            <PlusIcon /> New
          </Button>
        )}
      </PageTitle>
      {form ? (
        <GenericForm
          title={!form.id ? "Create" : "Edit"}
          onSave={handleSave}
          onCancel={handleCancel}
        >
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Account title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.currentTarget.value,
                })
              }
            />
          </div>
        </GenericForm>
      ) : (
        <GenericList data={list} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
