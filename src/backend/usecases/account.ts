"use server";

import { auth } from "@/auth";
import AccountRepository from "@/backend/repositories/AccountRepository";
import { Account } from "@/core/models/Account";
import BackendFacade from "..";

const session = await auth();
const user = await BackendFacade.users.byEmail(session?.user.email!);

export async function accountSaveUseCase(
  data: Account
): Promise<Account | undefined> {
  if (!user) return;

  return await AccountRepository.save({ ...data, userId: user.id! });
}

export async function accountListUseCase(page: number = 1): Promise<Account[]> {
  if (!user) return [];

  return await AccountRepository.list({
    where: { userId: user.id },
    orderBy: { title: "asc" },
    page,
  });
}

export async function accountByIdUseCase(
  id: number
): Promise<Account | undefined> {
  const item = await AccountRepository.byId(id);

  if (!user || !item || item.userId != user.id) return;

  return item;
}

export async function accountDeleteUseCase(id: number): Promise<boolean> {
  const item = await AccountRepository.byId(id);

  if (!user || !item || item.userId != user.id) return false;

  return await AccountRepository.delete(item.id!);
}
