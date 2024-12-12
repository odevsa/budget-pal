import { Category } from "@/core/models/Category";
import { Pagination } from "@/core/models/Pagination";
import DB from "@/lib/db";

export default class CategoryRepository {
  public static async save(data: Category): Promise<Category | undefined> {
    try {
      const response = await DB.categories.upsert({
        where: { id: data.id ?? 0 },
        update: data,
        create: data,
      });

      return response as Category;
    } catch (e: any) {
      return undefined;
    }
  }

  public static async total(): Promise<number> {
    return await DB.categories.count();
  }

  public static async all({ where = {}, orderBy = {} }): Promise<Category[]> {
    return await DB.categories.findMany({
      where,
      orderBy,
    });
  }

  public static async page({
    where = {},
    orderBy = {},
    take = 10,
    page = 1,
  }): Promise<Pagination<Category>> {
    const data = await DB.categories.findMany({
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
    } catch (e: any) {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.categories.delete({ where: { id } });
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
