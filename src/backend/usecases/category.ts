"use server";

import { auth } from "@/auth";
import CategoryRepository from "@/backend/repositories/CategoryRepository";
import { Category } from "@/core/models/Category";
import { Pagination, PaginationParams } from "@/core/models/Pagination";
import { generateWhere } from "@/lib/utils";

export async function categorySaveUseCase(
  data: Category
): Promise<Category | undefined> {
  const session = await auth();
  if (!session?.user?.id) return;

  return await CategoryRepository.save({ ...data, userId: session?.user.id });
}

export async function categoryAllUseCase({
  q = "",
  page = 1,
}: PaginationParams = {}): Promise<Pagination<Category>> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await CategoryRepository.all({
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
