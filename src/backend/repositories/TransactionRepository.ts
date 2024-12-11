import { Transaction } from "@/core/models/Transaction";
import { Pagination } from "@/core/models/Pagination";
import DB from "@/lib/db";

export default class TransactionRepository {
  public static async save(
    data: Transaction
  ): Promise<Transaction | undefined> {
    try {
      const response = await DB.transactions.upsert({
        where: { id: data.id ?? 0 },
        update: { ...data, input: undefined, output: undefined },
        create: { ...data, input: undefined, output: undefined },
      });

      return response as Transaction;
    } catch (e: any) {
      return undefined;
    }
  }

  public static async total(): Promise<number> {
    return await DB.transactions.count();
  }

  public static async all({
    where = {},
    orderBy = {},
    take = 10,
    page = 1,
  }): Promise<Pagination<Transaction>> {
    const data = await DB.transactions.findMany({
      where,
      orderBy,
      take,
      skip: (page - 1) * take,
    });

    const total = await DB.transactions.count({
      where,
    });

    return {
      data: data.map((d) => ({
        ...d,
        value: parseFloat(d.value.toString()),
        inputId: d.inputId ?? undefined,
        outputId: d.outputId ?? undefined,
      })),
      total,
      page,
      totalPerPage: take,
      lastPage: Math.ceil(total / take),
    };
  }

  public static async byId(id: number): Promise<Transaction | undefined> {
    try {
      const item = (await DB.transactions.findUnique({
        where: { id },
      })) as Transaction;
      return { ...item, value: parseFloat(item.value.toString()) };
    } catch (e: any) {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.transactions.delete({ where: { id } });
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
