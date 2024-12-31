import { Storage } from "../constants/Storage";
import { Transaction } from "../models/Transaction";

export function transactionSetTransfer({
  inputId,
  outputId,
  categoryId,
}: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_TRANSFER,
    JSON.stringify({ inputId, outputId, categoryId })
  );
}

export function transactionGetTransfer(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_TRANSFER);

  if (data) return JSON.parse(data) as Transaction;
}

export function transactionSetPay({
  outputId,
  categoryId,
}: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_PAY,
    JSON.stringify({ outputId, categoryId })
  );
}

export function transactionGetPay(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_PAY);

  if (data) return JSON.parse(data) as Transaction;
}

export function transactionSetReceive({
  inputId,
  categoryId,
}: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_RECEIVE,
    JSON.stringify({ inputId, categoryId })
  );
}

export function transactionGetReceive(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_RECEIVE);

  if (data) return JSON.parse(data) as Transaction;
}

export function transactionSetInvoicePay({
  outputId,
  categoryId,
}: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_INVOICE_PAY,
    JSON.stringify({ outputId, categoryId })
  );
}

export function transactionGetInvoicePay(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_INVOICE_PAY);

  if (data) return JSON.parse(data) as Transaction;
}

export function transactionSetInvoiceReceive({
  inputId,
  categoryId,
}: Partial<Transaction>) {
  localStorage.setItem(
    Storage.TRANSACTION_LAST_INVOICE_RECEIVE,
    JSON.stringify({ inputId, categoryId })
  );
}

export function transactionGetInvoiceReceive(): Transaction | undefined {
  const data = localStorage.getItem(Storage.TRANSACTION_LAST_INVOICE_RECEIVE);

  if (data) return JSON.parse(data) as Transaction;
}
