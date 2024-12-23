import { Account } from "@/core/models/Account";
import { Pagination } from "@/core/models/Pagination";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

export default class AccountRepository {
  public static async save(data: Account): Promise<Account | undefined> {
    try {
      const response = await DB.accounts.upsert({
        where: { id: data.id ?? 0 },
        create: data as Prisma.AccountsCreateInput,
        update: data as Prisma.AccountsUpdateInput,
      });

      return response as Account;
    } catch {
      return undefined;
    }
  }

  public static async total(): Promise<number> {
    return await DB.accounts.count();
  }

  public static async all({
    include = {},
    where = {},
    orderBy = {},
  }): Promise<Account[]> {
    return await DB.accounts.findMany({
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
  }): Promise<Pagination<Account>> {
    const data = await DB.accounts.findMany({
      include,
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
    } catch {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.accounts.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
