"use server";

import BackendFacade from "@/backend";
import { Category, validationCategoryCreate } from "@/core/models/Category";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function saveAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    id: formData.get("id") ? parseInt(formData.get("id") as string) : undefined,
    title: (formData.get("title") as string).trim(),
  };

  const validation = z.object(validationCategoryCreate).safeParse(data);
  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };

  const saved = await BackendFacade.categories.save(data as Category);

  if (!saved) errors.message = t("crud.message.saveFailure");

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function deleteAction(data: Category): Promise<boolean> {
  if (!data.id) return false;

  return await BackendFacade.categories.delete(data.id);
}