"use client";

import { Account } from "@/core/models/Account";
import { useState } from "react";

function useGenericForm<T>(initialStateForm: Partial<Account>) {
  const [form, setForm] = useState<T>();

  return {
    form,
    setForm,
    handleNew: () => setForm(initialStateForm as T),
    handleEdit: (item: T) => setForm(item),
    handleCancel: () => setForm(undefined),
  };
}

export { useGenericForm };
