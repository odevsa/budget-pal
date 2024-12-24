"use server";

import { auth } from "@/auth";
import CategoryRepository from "@/backend/repositories/CategoryRepository";
import { Category } from "@/core/models/Category";
import {
  Pagination,
  PaginationParams,
  SearchParams,
} from "@/core/models/Pagination";
import { generateWhere, prepareObjectToSate } from "@/lib/utils";

export async function categorySaveUseCase(
  data: Category
): Promise<Category | undefined> {
  const session = await auth();
  if (!session?.user?.id) return;

  return await CategoryRepository.save({
    ...prepareObjectToSate(data),
    userId: session?.user.id,
  });
}

export async function categoryTotalUseCase(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return 0;

  return await CategoryRepository.total();
}

export async function categoryAllUseCase({
  q = "",
}: SearchParams = {}): Promise<Category[]> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await CategoryRepository.all({
    where: { userId: session?.user.id, ...generateWhere(q, ["title"]) },
    orderBy: { title: "asc" },
  });
}

export async function categoryPageUseCase({
  q = "",
  page = 1,
}: PaginationParams = {}): Promise<Pagination<Category>> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await CategoryRepository.page({
    where: { userId: session?.user.id, ...generateWhere(q, ["title"]) },
    orderBy: { title: "asc" },
    page,
  });
}

export async function categoryByIdUseCase(
  id: number
): Promise<Category | undefined> {
  const session = await auth();
  const item = await CategoryRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id) return;

  return item;
}

export async function categoryDeleteUseCase(id: number): Promise<boolean> {
  const session = await auth();
  const item = await CategoryRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id)
    return false;

  return await CategoryRepository.delete(item.id!);
}
