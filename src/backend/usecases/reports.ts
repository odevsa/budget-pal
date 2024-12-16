"use server";

import { auth } from "@/auth";
import ReportRepository from "../repositories/ReportRepository";
import { TransactionMonthlySummary } from "@/core/models/Report";

export async function reportMonthlySummaryUseCase(
  month: number,
  year: number
): Promise<TransactionMonthlySummary[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await ReportRepository.reportMonthlySummary({
    month,
    year,
    userId: session.user.id,
  });
}
