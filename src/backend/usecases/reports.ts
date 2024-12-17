"use server";

import { auth } from "@/auth";
import ReportRepository from "../repositories/ReportRepository";
import { TransactionMonthlySummary } from "@/core/models/Report";
import { Invoice } from "@/core/models/Invoice";

export async function reportMonthlySummaryUseCase(
  month: number,
  year: number,
  accountId?: number
): Promise<TransactionMonthlySummary[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await ReportRepository.reportMonthlySummary({
    accountId,
    month,
    year,
    userId: session.user.id,
  });
}

export async function reportMonthlyInvoicesUseCase(
  month: number,
  year: number
): Promise<Invoice[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await ReportRepository.reportMonthlyInvoices({
    month,
    year,
    userId: session.user.id,
  });
}
