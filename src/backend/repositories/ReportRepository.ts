import { Pagination } from "@/core/models/Pagination";
import {
  TransactionMonthlySummary,
  TransactionMonthlySummaryParams,
} from "@/core/models/Report";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

export default class ReportRepository {
  public static async reportMonthlySummary({
    userId,
    month,
    year,
  }: TransactionMonthlySummaryParams): Promise<TransactionMonthlySummary[]> {
    const list: TransactionMonthlySummary[] = [
      { day: 11, current: 14, previous: 20 },
      { day: 12, current: 16, previous: 22 },
      { day: 13, current: 21, previous: 22 },
      { day: 14, current: 22, previous: 24 },
    ];
    return list;
  }
}
