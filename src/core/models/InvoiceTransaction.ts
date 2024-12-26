import { Invoice } from "./Invoice";
import { Transaction } from "./Transaction";

export interface InvoiceTransaction {
  invoiceId: number;
  transactionId: number;
  userId: number;
  assignedAt?: Date;

  invoice?: Invoice;
  transaction?: Transaction;
}
