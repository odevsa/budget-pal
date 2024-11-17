import { Account } from "@/core/models/Account";
import { PrismaClient } from "@prisma/client";

export default class AccountRepository {
  private static db: PrismaClient = new PrismaClient();

  public static async save(data: Account): Promise<Account> {
    const response = await this.db.accounts.upsert({
      where: { id: data.id ?? 0 },
      update: data,
      create: data,
    });

    return response as Account;
  }

  public static async list(filter?: any): Promise<Account[]> {
    return await this.db.accounts.findMany({
      where: filter ?? {},
    });
  }

  public static async byId(id: number): Promise<Account> {
    return (await this.db.accounts.findUnique({ where: { id } })) as Account;
  }

  public static async delete(id: number): Promise<any> {
    return await this.db.accounts.delete({ where: { id } });
  }
}
