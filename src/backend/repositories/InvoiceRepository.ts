import { Invoice } from "@/core/models/Invoice";
import { Pagination } from "@/core/models/Pagination";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

export default class InvoiceRepository {
  public static async save(data: Invoice): Promise<Invoice | undefined> {
    try {
      const response = await DB.invoices.upsert({
        where: { id: data.id ?? 0 },
        create: data as Prisma.InvoicesCreateInput,
        update: data as Prisma.InvoicesUpdateInput,
      });

      return response as Invoice;
    } catch {
      return undefined;
    }
  }

  public static async total(): Promise<number> {
    return await DB.invoices.count();
  }

  public static async all({
    include = {},
    where = {},
    orderBy = {},
  }): Promise<Invoice[]> {
    return await DB.invoices.findMany({
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
  }): Promise<Pagination<Invoice>> {
    const data = await DB.invoices.findMany({
      include,
      where,
      orderBy,
      take,
      skip: (page - 1) * take,
    });

    const total = await DB.invoices.count({
      where,
    });

    return {
      data: data.map((d) => ({ ...d, value: parseFloat(d.value.toString()) })),
      total,
      page,
      totalPerPage: take,
      lastPage: Math.ceil(total / take),
    };
  }

  public static async byId(id: number): Promise<Invoice | undefined> {
    try {
      const item = (await DB.invoices.findUnique({ where: { id } })) as Invoice;
      return { ...item, value: parseFloat(item.value.toString()) };
    } catch {
      return undefined;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await DB.invoices.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
