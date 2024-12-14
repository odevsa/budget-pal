import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { Account } from "./Account";
import { User } from "./User";
import { Category } from "./Category";

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
}

export enum TransactionType {
  Pay = "pay",
  Receive = "receive",
  Transfer = "transfer",
}

export const validationTransactionCreate = z
  .object({
    description: z.string().min(3).max(256),
    transactedAt: z.date(),
    value: z.number().min(0.01),
    categoryId: z.number(),
    inputId: z.number().min(1).optional(),
    outputId: z.number().min(1).optional(),
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
