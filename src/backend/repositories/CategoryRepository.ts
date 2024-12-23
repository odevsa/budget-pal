import { Category } from "@/core/models/Category";
import { Pagination } from "@/core/models/Pagination";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

export default class CategoryRepository {
  public static async save(data: Category): Promise<Category | undefined> {
    try {
      const response = await DB.categories.upsert({
        where: { id: data.id ?? 0 },
        create: data as Prisma.CategoriesCreateInput,
        update: data as Prisma.CategoriesUpdateInput,
      });

      return response as Category;
    } catch {
      return undefined;
    }
  }

  public static async total(): Promise<number> {
    return await DB.categories.count();
  }

  public static async all({
    include = {},
    where = {},
    orderBy = {},
  }): Promise<Category[]> {
    return await DB.categories.findMany({
      include,
      where,
      orderBy,
    });
  }

  public static async page({
    include = {},
    where = {},
    orderBy = {},
    take = 15,
    page = 1,
  }): Promise<Pagination<Category>> {
    const data = await DB.categories.findMany({
      include,
      where,
      orderBy,
      take,
      skip: (page - 1) * take,
    });

    const total = await DB.categories.count({
      where,
    });

    return {
      data,
      total,
      page,
      totalPerPage: take,
      lastPage: Math.ceil(total / take),
    };
  }

  public static async byId(id: number): Promise<Category | undefined> {
    try {
      return (await DB.categories.findUnique({ where: { id } })) as Category;
    } catch {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.categories.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
