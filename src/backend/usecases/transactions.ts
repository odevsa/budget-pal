"use server";

import { auth } from "@/auth";
import TransactionRepository from "@/backend/repositories/TransactionRepository";
import {
  Pagination,
  PaginationParams,
  SearchParams,
} from "@/core/models/Pagination";
import { Transaction } from "@/core/models/Transaction";
import { generateWhere, prepareObjectToSate } from "@/lib/utils";

export async function transactionSaveUseCase(
  data: Transaction
): Promise<Transaction | undefined> {
  const session = await auth();
  if (!session?.user?.id) return;

  return await TransactionRepository.save({
    ...prepareObjectToSate(data),
    userId: session?.user.id,
  });
}

export async function transactionTotalUseCase(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return 0;

  return await TransactionRepository.total();
}

export async function transactionAllUseCase({
  q = "",
}: SearchParams = {}): Promise<Transaction[]> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await TransactionRepository.all({
    where: { userId: session?.user.id, ...generateWhere(q, ["title"]) },
    orderBy: { title: "asc" },
  });
}

export async function transactionPageUseCase({
  q = "",
  page = 1,
}: PaginationParams = {}): Promise<Pagination<Transaction>> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await TransactionRepository.page({
    include: { category: true, input: true, output: true },
    where: { userId: session?.user.id, ...generateWhere(q, ["description"]) },
    orderBy: { transactedAt: "desc" },
    page,
  });
}

export async function transactionByIdUseCase(
  id: number
): Promise<Transaction | undefined> {
  const session = await auth();
  const item = await TransactionRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id) return;

  return item;
}

export async function transactionDeleteUseCase(id: number): Promise<boolean> {
  const session = await auth();
  const item = await TransactionRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id)
    return false;

  return await TransactionRepository.delete(item.id!);
}
