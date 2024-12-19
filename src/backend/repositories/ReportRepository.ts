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

    const accumulatorByDay = (
      list: TransactionPayload[],
      day: number,
      accountId?: number
    ): number =>
      list
        .filter((item) => day == item.transactedAt.getDate())
        .reduce((accumulator: number, payload: TransactionPayload) => {
          if (day != payload.transactedAt.getDate()) return accumulator;

          let conditionPlus: boolean = !!payload.inputId && !payload.outputId;
          let conditionMinus: boolean = !payload.inputId && !!payload.outputId;
          if (accountId) {
            conditionPlus = payload.inputId == accountId;
            conditionMinus = payload.outputId == accountId;
          }

          const value = conditionPlus
            ? payload.value.toNumber()
            : conditionMinus
            ? -payload.value.toNumber()
            : 0;

          return accumulator + value;
        }, 0);

    const data: TransactionMonthlySummary[] = [];
    const lastDay = new Date(year, month, 0).getDate();
    let currentAccumulator = 0;
    let previousAccumulator = 0;
    for (let day = 1; day <= lastDay; day++) {
      currentAccumulator += accumulatorByDay(
        currentMonthTransactions,
        day,
        accountId
      );
      previousAccumulator += accumulatorByDay(
        previousMonthTransactions,
        day,
        accountId
      );
      const item: TransactionMonthlySummary = {
        day,
        current: currentAccumulator,
        previous: previousAccumulator,
      };
      data.push(item);
    }
    return data;
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
