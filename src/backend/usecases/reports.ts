"use server";

import { auth } from "@/auth";
import { Account } from "@/core/models/Account";
import { Invoice } from "@/core/models/Invoice";
import { TransactionMonthlySummary } from "@/core/models/Report";
import { TransactionPayload } from "@/core/models/Transaction";
import AccountRepository from "../repositories/AccountRepository";
import ReportRepository from "../repositories/ReportRepository";

export async function reportMonthlySummaryUseCase(
  month: number,
  year: number,
  accountId?: number
): Promise<TransactionMonthlySummary[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  const currentMonthTransactions =
    await ReportRepository.transactionPayloadByMonth({
      userId: session.user.id,
      accountId,
      month,
      year,
    });

  const previousMonthTransactions =
    await ReportRepository.transactionPayloadByMonth({
      userId: session.user.id,
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

        const valueWhenMinus = conditionMinus ? -payload.value.toNumber() : 0;
        const value = conditionPlus ? payload.value.toNumber() : valueWhenMinus;

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

export async function reportBalanceUseCase(): Promise<Account[]> {
  const onlyVaue = {
    select: {
      value: true,
    },
  };

  const accounts = await AccountRepository.all({
    include: {
      inputs: onlyVaue,
      outputs: onlyVaue,
    },
    orderBy: { title: "asc" },
  });

  const data = accounts.map((account) => {
    const totalInputs =
      account.inputs?.reduce(
        (sum, transaction) => sum + parseFloat(transaction.value.toString()),
        0
      ) ?? 0;

    const totalOutputs =
      account.outputs?.reduce(
        (sum, transaction) => sum + parseFloat(transaction.value.toString()),
        0
      ) ?? 0;

    return {
      ...account,
      balance: totalInputs - totalOutputs,
    };
  });

  return data;
}

export async function reportMonthlyInvoicesUseCase(
  month: number,
  year: number
): Promise<Invoice[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await ReportRepository.invoiceTransactionsByMonth({
    userId: session.user.id,
    startDate: new Date(year, month - 1),
    endDate: new Date(year, month, 0),
  });
}
