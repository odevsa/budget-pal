import { Invoice } from "@/core/models/Invoice";
import { Pagination } from "@/core/models/Pagination";
import { Transaction } from "@/core/models/Transaction";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

export default class TransactionRepository {
  public static async save(
    data: Transaction
  ): Promise<Transaction | undefined> {
    try {
      const response = await DB.transactions.upsert({
        where: { id: data.id ?? 0 },
        create: {
          ...data,
          invoiceTransaction: data.invoiceTransaction?.invoiceId
            ? {
                create: [
                  {
                    invoiceId: data.invoiceTransaction.invoiceId,
                    userId: data.userId,
                  },
                ],
              }
            : undefined,
        } as Prisma.TransactionsCreateInput,
        update: {
          ...data,
          invoiceTransaction: undefined,
        } as Prisma.TransactionsUpdateInput,
      });

      return response as Transaction;
    } catch (e) {
      return undefined;
    }
  }

  public static async total(): Promise<number> {
    return await DB.transactions.count();
  }

  public static async all({
    include = {},
    where = {},
    orderBy = {},
  }): Promise<Transaction[]> {
    return await DB.transactions.findMany({ include, where, orderBy });
  }

  public static async page({
    include = {},
    where = {},
    orderBy = {},
    take = 15,
    page = 1,
  }): Promise<Pagination<Transaction>> {
    const data = await DB.transactions.findMany({
      include,
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
      const item = await DB.transactions.findUnique({
        where: { id },
        include: {
          invoiceTransaction: {
            include: {
              invoice: true,
            },
          },
        },
      });

      if (!item) return;

      return {
        ...item,
        invoiceTransaction: undefined,
        value: parseFloat(item.value.toString()),
        invoices: item.invoiceTransaction.map((it) => ({
          ...it.invoice,
          value: parseFloat(it.invoice.value.toString()),
        })),
      } as Transaction;
    } catch {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.$transaction(async (prisma) => {
        await prisma.invoiceTransaction.deleteMany({
          where: { transactionId: id },
        });
        await prisma.transactions.delete({ where: { id } });
      });
      return true;
    } catch {
      return false;
    }
  }
}
