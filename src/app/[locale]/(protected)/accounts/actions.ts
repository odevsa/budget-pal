"use server";

import BackendFacade from "@/backend";
import { Account, validationAccountCreate } from "@/core/models/Account";
import { getNumber, getString } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function saveAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    id: getNumber(formData, "id"),
    title: getString(formData, "title"),
  };

  const validation = validationAccountCreate.safeParse(data);
  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
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
