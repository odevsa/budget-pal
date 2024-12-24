"use server";

import { auth } from "@/auth";
import AccountRepository from "@/backend/repositories/AccountRepository";
import { Account } from "@/core/models/Account";
import {
  Pagination,
  PaginationParams,
  SearchParams,
} from "@/core/models/Pagination";
import { generateWhere, prepareObjectToSate } from "@/lib/utils";

export async function accountSaveUseCase(
  data: Account
): Promise<Account | undefined> {
  const session = await auth();
  if (!session?.user?.id) return;

  return await AccountRepository.save({
    ...prepareObjectToSate(data),
    userId: session?.user.id,
  });
}

export async function accountTotalUseCase(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return 0;

  return await AccountRepository.total();
}

export async function accountAllUseCase({ q = "" }: SearchParams = {}): Promise<
  Account[]
> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await AccountRepository.all({
    where: { userId: session?.user.id, ...generateWhere(q, ["title"]) },
    orderBy: { title: "asc" },
  });
}

export async function accountPageUseCase({
  q = "",
  page = 1,
}: PaginationParams = {}): Promise<Pagination<Account>> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await AccountRepository.page({
    where: { userId: session?.user.id, ...generateWhere(q, ["title"]) },
    orderBy: { title: "asc" },
    page,
  });
}

export async function accountByIdUseCase(
  id: number
): Promise<Account | undefined> {
  const session = await auth();
  const item = await AccountRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id) return;

  return item;
}

export async function accountDeleteUseCase(id: number): Promise<boolean> {
  const session = await auth();
  const item = await AccountRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id)
    return false;

  return await AccountRepository.delete(item.id!);
}
