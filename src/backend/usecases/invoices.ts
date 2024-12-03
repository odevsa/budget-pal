"use server";

import { auth } from "@/auth";
import InvoiceRepository from "@/backend/repositories/InvoiceRepository";
import { Invoice } from "@/core/models/Invoice";
import { Pagination, PaginationParams } from "@/core/models/Pagination";
import { generateWhere } from "@/lib/utils";

export async function invoiceSaveUseCase(
  data: Invoice
): Promise<Invoice | undefined> {
  const session = await auth();
  if (!session?.user?.id) return;

  return await InvoiceRepository.save({ ...data, userId: session?.user.id });
}

export async function invoiceTotalUseCase(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await InvoiceRepository.total();
}

export async function invoiceAllUseCase({
  q = "",
  page = 1,
}: PaginationParams = {}): Promise<Pagination<Invoice>> {
  const session = await auth();
  if (!session?.user?.id) return {} as any;

  return await InvoiceRepository.all({
    where: { userId: session?.user.id, ...generateWhere(q, ["title"]) },
    orderBy: { title: "asc" },
    page,
  });
}

export async function invoiceByIdUseCase(
  id: number
): Promise<Invoice | undefined> {
  const session = await auth();
  const item = await InvoiceRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id) return;

  return item;
}

export async function invoiceDeleteUseCase(id: number): Promise<boolean> {
  const session = await auth();
  const item = await InvoiceRepository.byId(id);

  if (!session?.user?.id || !item || item.userId != session?.user.id)
    return false;

  return await InvoiceRepository.delete(item.id!);
}
