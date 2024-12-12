"use server";

import { auth } from "@/auth";
import TransactionRepository from "@/backend/repositories/TransactionRepository";
import { Transaction } from "@/core/models/Transaction";
import {
  Pagination,
  PaginationParams,
  SearchParams,
} from "@/core/models/Pagination";
import { generateWhere } from "@/lib/utils";

export async function transactionSaveUseCase(
  data: Transaction
): Promise<Transaction | undefined> {
  const session = await auth();
  if (!session?.user?.id) return;

  return await TransactionRepository.save({
    ...data,
    userId: session?.user.id,
  });
}

export async function transactionTotalUseCase(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

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
    where: { userId: session?.user.id, ...generateWhere(q, ["description"]) },
    orderBy: { createdAt: "desc" },
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
