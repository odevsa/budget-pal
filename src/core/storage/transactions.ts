import { Storage } from "../constants/Storage";
import { Transaction } from "../models/Transaction";

export function transactionSetTransfer({
  inputId,
  outputId,
}: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_TRANSFER,
    JSON.stringify({ inputId, outputId })
  );
}

export function transactionGetTransfer(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_TRANSFER);

  if (data) return JSON.parse(data) as Transaction;
}

export function transactionSetPay({ outputId }: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_PAY,
    JSON.stringify({ outputId })
  );
}

export function transactionGetPay(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_PAY);

  if (data) return JSON.parse(data) as Transaction;
}

export function transactionSetReceive({ inputId }: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_RECEIVE,
    JSON.stringify({ inputId })
  );
}

export function transactionGetReceive(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_RECEIVE);

  if (data) return JSON.parse(data) as Transaction;
}
