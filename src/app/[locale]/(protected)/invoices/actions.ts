"use server";

import BackendFacade from "@/backend";
import { Invoice, validationInvoiceCreate } from "@/core/models/Invoice";
import { getBoolean, getNumber, getString } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function saveAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    id: getNumber(formData, "id"),
    title: getString(formData, "title"),
    value: getNumber(formData, "value"),
    dueDay: getNumber(formData, "dueDay"),
    isInput: getBoolean(formData, "isInput"),
    isActive: getBoolean(formData, "isActive"),
  };

  const validation = z.object(validationInvoiceCreate).safeParse(data);
  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };

  const saved = await BackendFacade.invoices.save(data as Invoice);

  if (!saved) errors.message = t("crud.message.saveFailure");

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function deleteAction(data: Invoice): Promise<boolean> {
  if (!data.id) return false;

  return await BackendFacade.invoices.delete(data.id);
}
