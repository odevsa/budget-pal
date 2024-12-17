export interface ReportMonthlyParams {
  userId: number;
  month: number;
  year: number;
}

export interface ReportTransactionMonthlyParams extends ReportMonthlyParams {
  accountId?: number;
}

export interface TransactionMonthlySummary {
  day: number;
  current: number;
  previous: number;
}
