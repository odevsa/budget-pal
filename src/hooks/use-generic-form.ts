"use client";

import { Account } from "@/core/models/Account";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import BackendFacade from "@/backend";

function useGenericForm<T>(
  initialStateForm: Partial<Account>,
  methods: {
    list(): Promise<T[]>;
    save(item: T): Promise<T | undefined>;
    delete(id: number): Promise<boolean>;
  }
) {
  const [list, setList] = useState<T[]>([]);
  const [form, setForm] = useState<T>();
  const { toast } = useToast();

  useEffect(() => {
    loadList();
  }, []);

  async function loadList() {
    const list: T[] = (await methods.list()) as T[];
    setList(list);
  }

  async function handleSave() {
    if (!form) return;

    const saved = await methods.save(form);
    const title = "Save action";

    if (!saved) {
      toast({
        variant: "destructive",
        title,
        description: `Wasn't possible to save!`,
      });

      return;
    }

    toast({
      variant: "success",
      title,
      description: `Successfully saved!`,
    });
    setForm(undefined);
    loadList();
  }

  async function handleDelete(item: Account) {
    if (!item.id) return;

    const deleted = await methods.delete(item.id);
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

  return {
    list,
    form,
    setForm,
    handleSave,
    handleDelete,
    handleNew: () => setForm(initialStateForm as T),
    handleEdit: (item: T) => setForm(item),
    handleCancel: () => setForm(undefined),
  };
}

export { useGenericForm };
