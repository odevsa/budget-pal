"use server";

import { auth } from "@/auth";
import TransactionRepository from "@/backend/repositories/TransactionRepository";
import { Pagination, SearchParams } from "@/core/models/Pagination";
import {
  Transaction,
  TransactionPaginationParams,
} from "@/core/models/Transaction";
import { generateWhere } from "@/lib/utils";
import { endOfDay, isValid, parse, startOfDay } from "date-fns";

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
  transactedAt = "",
  q = "",
  page = 1,
}: TransactionPaginationParams = {}): Promise<Pagination<Transaction>> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  const parsedTransactedAt = parse(transactedAt, "yyyy-MM-dd", new Date());

  return await TransactionRepository.page({
    include: { category: true, input: true, output: true },
    where: {
      userId: session?.user.id,
      ...generateWhere(q, ["description"]),
      ...(isValid(parsedTransactedAt)
        ? {
            transactedAt: {
              gte: startOfDay(parsedTransactedAt),
              lte: endOfDay(parsedTransactedAt),
            },
          }
        : {}),
    },
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
