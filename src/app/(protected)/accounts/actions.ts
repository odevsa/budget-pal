"use server";

import BackendFacade from "@/backend";
import { Account } from "@/core/models/Account";

export async function saveAction(_previousState: any, data: FormData) {
  const id = data.get("id") as string;
  const title = (data.get("title") as string).trim();
  const errors: any = {};

  if (title.length < 3 || title.length > 30)
    errors.title = "Must contain at least 3 and no more than 30 characters!";
  if (!title) errors.title = "Required!";

  if (Object.keys(errors).length == 0) {
    const saved = await BackendFacade.accounts.save({
      id: id ? parseInt(id) : undefined,
      title,
    } as Account);

    if (!saved) errors.message = "Wasn't possible to save!";
  }

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function deleteAction(data: Account): Promise<boolean> {
  if (!data.id) return false;

  return await BackendFacade.accounts.delete(data.id);
}
