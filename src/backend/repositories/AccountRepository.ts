import { Account } from "@/core/models/Account";
import { Pagination } from "@/core/models/Pagination";
import DB from "@/lib/db";

export default class AccountRepository {
  public static async save(data: Account): Promise<Account | undefined> {
    try {
      const response = await DB.accounts.upsert({
        where: { id: data.id ?? 0 },
        update: data,
        create: data,
      });

      return response as Account;
    } catch (e: any) {
      return undefined;
    }
  }

  public static async all({
    where = {},
    orderBy = {},
    take = 15,
    page = 1,
  }): Promise<Pagination<Account>> {
    const data = await DB.accounts.findMany({
      where,
      orderBy,
      take,
      skip: (page - 1) * take,
    });

    const total = await DB.accounts.count({
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

  public static async byId(id: number): Promise<Account | undefined> {
    try {
      return (await DB.accounts.findUnique({ where: { id } })) as Account;
    } catch (e: any) {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.accounts.delete({ where: { id } });
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
