import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { Account } from "./Account";
import { Category } from "./Category";
import { InvoiceTransaction } from "./InvoiceTransaction";
import { User } from "./User";
import { PaginationParams } from "./Pagination";

export interface Transaction {
  id?: number;
  userId: number;
  description: string;
  transactedAt: Date;
  categoryId?: number | null;
  inputId?: number | null;
  outputId?: number | null;
  value: Decimal | number;
  createdAt?: Date;

  user?: User;
  category?: Category;
  input?: Account;
  output?: Account;
  invoiceTransaction?: InvoiceTransaction;
}

export interface TransactionPaginationParams extends PaginationParams {
  transactedAt?: string;
}

export interface TransactionPayload {
  transactedAt: Date;
  inputId: number | null;
  outputId: number | null;
  value: Prisma.Decimal;
}

export enum TransactionType {
  Pay = "pay",
  Receive = "receive",
  Transfer = "transfer",
  InvoicePay = "invoice_pay",
  InvoiceReceive = "invoice_receive",
}

export const validationTransactionCreate = z
  .object({
    description: z.string().min(3).max(256),
    transactedAt: z.date(),
    value: z.number().min(0.01),
    categoryId: z.number(),
    inputId: z.number().min(1).optional().nullable(),
    outputId: z.number().min(1).optional().nullable(),
  })
  .refine((data) => !!data.inputId || !!data.outputId, {
    message: "transactions.message.selectAccount",
    path: ["outputId"],
  })
  .refine((data) => !!data.inputId || !!data.outputId, {
    message: "transactions.message.selectAccount",
    path: ["inputId"],
  })
  .refine(
    (data) => (data.inputId || data.outputId) && data.inputId != data.outputId,
    {
      message: "transactions.message.selectDifferentAccount",
      path: ["outputId"],
    }
  )
  .refine(
    (data) => (data.inputId || data.outputId) && data.inputId != data.outputId,
    {
      message: "transactions.message.selectDifferentAccount",
      path: ["inputId"],
    }
  );

export const validationTransactionUpdate = validationTransactionCreate;
