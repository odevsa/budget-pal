import { Invoice } from "@/core/models/Invoice";
import { ReportTransactionMonthlyParams } from "@/core/models/Report";
import { TransactionPayload } from "@/core/models/Transaction";
import DB from "@/lib/db";

export default class ReportRepository {
  public static async transactionPayloadByMonth({
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

  public static async invoiceTransactionsByMonth({
    userId,
    startDate,
    endDate,
  }: {
    userId: number;
    startDate: Date;
    endDate: Date;
  }): Promise<Invoice[]> {
    try {
      const list = await DB.invoices.findMany({
        where: {
          userId,
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

      return list.map((invoice) => ({
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
    } catch {
      return [];
    }
  }
}
