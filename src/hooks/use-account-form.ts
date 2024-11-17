"use client";

import { Account } from "@/core/models/Account";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import BackendFacade from "@/backend";

const INITIAL_STATE: Partial<Account> = {
  title: "",
};

function useAccountForm() {
  const [list, setList] = useState<Account[]>([]);
  const [form, setForm] = useState<Account>();
  const { toast } = useToast();

  useEffect(() => {
    loadList();
  }, []);

  async function loadList() {
    const list: Account[] = await BackendFacade.accounts.list();
    setList(list);
  }

  async function handleSave() {
    if (!form) return;

    const saved = await BackendFacade.accounts.save(form);
    const title = "Save Account";

    if (!saved) {
      toast({
        variant: "destructive",
        title,
        description: `Wasn't possible to save account "${form.title}"!`,
      });

      return;
    }

    toast({
      variant: "success",
      title,
      description: `Acount ${saved.title!} successfully saved!`,
    });
    setForm(undefined);
    loadList();
  }

  async function handleDelete(item: Account) {
    if (!item.id) return;

    const deleted = await BackendFacade.accounts.delete(item.id);
    const title = "Delete Account";

    if (!deleted) {
      toast({
        variant: "destructive",
        title,
        description: `Wasn't possible to delete account "${item.title}"!`,
      });

      return;
    }

    toast({
      variant: "success",
      title,
      description: `Acount ${item.title} successfully deleted!`,
    });
    loadList();
  }

  return {
    list,
    form,
    setForm,
    handleSave,
    handleDelete,
    handleNew: () => setForm(INITIAL_STATE as Account),
    handleEdit: (item: Account) => setForm(item),
    handleCancel: () => setForm(undefined),
  };
}

export { useAccountForm };
