"use server";

import BackendFacade from "@/backend";
import { Account } from "@/core/models/Account";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function saveAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    id: formData.get("id") ? parseInt(formData.get("id") as string) : undefined,
    title: (formData.get("title") as string).trim(),
  };

  const validated = z
    .object({
      title: z.string().min(3).max(30),
    })
    .safeParse(data);

  if (!validated.success)
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };

  const saved = await BackendFacade.accounts.save(data as Account);

  if (!saved) errors.message = t("crud.message.saveFailure");

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function deleteAction(data: Account): Promise<boolean> {
  if (!data.id) return false;

  return await BackendFacade.accounts.delete(data.id);
}
