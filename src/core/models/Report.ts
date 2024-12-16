export interface TransactionMonthlySummary {
  day: number;
  current: number;
  previous: number;
}

export interface TransactionMonthlySummaryParams {
  userId: number;
  month: number;
  year: number;
}
