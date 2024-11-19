"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Account } from "@/core/models/Account";
import { useGenericForm } from "@/hooks/use-generic-form";
import { PlusIcon, WalletIcon } from "lucide-react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericList from "../_components/generic-list";
import PageTitle from "../_components/page-title";
import BackendFacade from "@/backend";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { saveAction } from "./action";

export default function Accounts() {
  const { toast } = useToast();
  const [list, setList] = useState<Account[]>([]);
  const [formState, setFormState] = useState<FormActionState>();
  const { form, setForm, handleNew, handleEdit, handleCancel } =
    useGenericForm<Account>({ title: "" });

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    setList(await BackendFacade.accounts.list());
  };

  const handleResponse = (state: FormActionState) => {
    setFormState(state);

    if (!state.success) return;

    toast({
      variant: "success",
      title: "Save action",
      description: `Successfully saved!`,
    });
    setForm(undefined);

    loadList();
  };

  async function handleDelete(item: Account) {
    if (!item.id) return;

    const deleted = await BackendFacade.accounts.delete(item.id);
    const title = "Delete action";

    if (!deleted) {
      toast({
        variant: "destructive",
        title,
        description: `Wasn't possible to delete!`,
      });

      return;
    }

    toast({
      variant: "success",
      title,
      description: `Successfully deleted!`,
    });

    loadList();
  }

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
          action={saveAction}
          onResponse={handleResponse}
          onCancel={handleCancel}
        >
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Account title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.currentTarget.value,
                })
              }
            />
            {formState?.errors?.title && (
              <span className="text-destructive font-bold text-xs">
                {formState.errors.title}
              </span>
            )}
          </div>
        </GenericForm>
      ) : (
        <GenericList data={list} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
