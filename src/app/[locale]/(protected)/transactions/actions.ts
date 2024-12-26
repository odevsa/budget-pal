"use server";

import BackendFacade from "@/backend";
import {
  Transaction,
  validationTransactionCreate,
} from "@/core/models/Transaction";
import { getDate, getNumber, getString } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { FormActionState } from "../_components/generic-form";

export async function saveAction(
  _previousState: any,
  formData: FormData
): Promise<FormActionState> {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    id: getNumber(formData, "id"),
    description: getString(formData, "description"),
    transactedAt: getDate(formData, "transactedAt"),
    value: getNumber(formData, "value"),
    categoryId: getNumber(formData, "categoryId"),
    inputId: getNumber(formData, "inputId") ?? null,
    outputId: getNumber(formData, "outputId") ?? null,
  };

  const validation = validationTransactionCreate.safeParse(data);
  if (!validation.success)
    return {
      success: false,
      errors: { ...errors, ...validation.error.flatten().fieldErrors },
    };

  const saved = await BackendFacade.transactions.save(data as Transaction);

  if (!saved) errors.message = t("crud.message.saveFailure");

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function deleteAction(data: Transaction): Promise<boolean> {
  if (!data.id) return false;

  return await BackendFacade.transactions.delete(data.id);
}
