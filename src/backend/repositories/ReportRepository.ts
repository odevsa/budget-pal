import {
  TransactionMonthlySummary,
  TransactionMonthlySummaryParams,
} from "@/core/models/Report";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

interface TransactionPayload {
  transactedAt: Date;
  inputId: number | null;
  outputId: number | null;
  value: Prisma.Decimal;
}

export default class ReportRepository {
  public static async byMonth({
    userId,
    month,
    year,
  }: TransactionMonthlySummaryParams): Promise<TransactionPayload[]> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    return await DB.transactions.findMany({
      where: {
        userId: userId,
        transactedAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        transactedAt: true,
        value: true,
        inputId: true,
        outputId: true,
      },
    });
  }

  public static async reportMonthlySummary({
    userId,
    month,
    year,
  }: TransactionMonthlySummaryParams): Promise<TransactionMonthlySummary[]> {
    const currentMonthTransactions = await this.byMonth({
      userId,
      month,
      year,
    });

    const previousMonthTransactions = await this.byMonth({
      userId,
      month: month - 1,
      year,
    });

    const endOfCurrentMonth = new Date(year, month, 0);
    const startOfPreviousMonth = new Date(year, month - 2, 1);
    const daysInCurrentMonth = endOfCurrentMonth.getDate();
    const dailySummary: TransactionMonthlySummary[] = [];

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const currentDay = new Date(year, month - 1, day);
      const currentDayTransactions = currentMonthTransactions.filter(
        (t) => t.transactedAt.getDate() === currentDay.getDate()
      );
      const previousDayTransactions = previousMonthTransactions.filter(
        (t) =>
          t.transactedAt.getDate() === day &&
          t.transactedAt.getMonth() === startOfPreviousMonth.getMonth()
      );
      const currentTotal = currentDayTransactions.reduce((sum, t) => {
        if (t.inputId && t.outputId) return sum; // Transfer between accounts, ignore
        return (
          sum +
          (t.inputId ? t.value.toNumber() : 0) -
          (t.outputId ? t.value.toNumber() : 0)
        );
      }, 0);
      const previousTotal = previousDayTransactions.reduce((sum, t) => {
        if (t.inputId && t.outputId) return sum; // Transfer between accounts, ignore
        return (
          sum +
          (t.inputId ? t.value.toNumber() : 0) -
          (t.outputId ? t.value.toNumber() : 0)
        );
      }, 0);
      const lastSummary = dailySummary[dailySummary.length - 1] || {
        current: 0,
        previous: 0,
      };

      dailySummary.push({
        day: day,
        current: lastSummary.current + currentTotal,
        previous: lastSummary.previous + previousTotal,
      });
    }

    return dailySummary;
  }
}
