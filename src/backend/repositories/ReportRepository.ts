import { Invoice } from "@/core/models/Invoice";
import {
  TransactionMonthlySummary,
  ReportMonthlyParams,
  ReportTransactionMonthlyParams,
} from "@/core/models/Report";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";
import { endOfMonth } from "date-fns";

interface TransactionPayload {
  transactedAt: Date;
  inputId: number | null;
  outputId: number | null;
  value: Prisma.Decimal;
}

export default class ReportRepository {
  public static async byMonth({
    userId,
    accountId,
    month,
    year,
  }: ReportTransactionMonthlyParams): Promise<TransactionPayload[]> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    return await DB.transactions.findMany({
      where: {
        OR: accountId
          ? [{ inputId: accountId }, { outputId: accountId }]
          : undefined,
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
    accountId,
    month,
    year,
  }: ReportTransactionMonthlyParams): Promise<TransactionMonthlySummary[]> {
    const currentMonthTransactions = await this.byMonth({
      userId,
      accountId,
      month,
      year,
    });

    const previousMonthTransactions = await this.byMonth({
      userId,
      accountId,
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

  public static async reportMonthlyInvoices({
    userId,
    month,
    year,
  }: ReportMonthlyParams): Promise<Invoice[]> {
    try {
      const startDate = new Date(year, month - 1);
      const endDate = endOfMonth(startDate);
      const invoices = await DB.invoices.findMany({
        where: {
          userId: userId,
          isActive: true,
        },
        include: {
          invoiceTransaction: {
            include: {
              transaction: true,
            },
          },
        },
      });

      const result = invoices.map((invoice) => ({
        id: invoice.id,
        userId: invoice.userId,
        title: invoice.title,
        value: parseFloat(invoice.value.toString()),
        isInput: invoice.isInput,
        isActive: invoice.isActive,
        dueDay: invoice.dueDay,
        createdAt: invoice.createdAt,
        transactions: invoice.invoiceTransaction
          .map((item) => ({
            ...item.transaction,
            value: parseFloat(item.transaction.value.toString()),
          }))
          .filter(
            (transaction) =>
              transaction.transactedAt >= startDate &&
              transaction.transactedAt <= endDate
          ),
      }));

      return result;
    } catch (e) {
      return [];
    }
  }
}
