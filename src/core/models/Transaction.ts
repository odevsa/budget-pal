import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { Account } from "./Account";

export interface Transaction {
  id?: number;
  userId: number;
  inputId?: number;
  outputId?: number;
  value: Decimal | number;
  createdAt?: Date;

  input?: Account;
  output?: Account;
}

export enum TransactionType {
  Input = "input",
  Output = "output",
  Transfer = "transfer",
}

export const validationTransactionCreate = z
  .object({
    value: z.number().min(0),
    inputId: z.number().min(1).optional(),
    outputId: z.number().min(1).optional(),
  })
  .refine((data) => data.inputId !== undefined || data.outputId !== undefined, {
    message: "transaction.message.selectAccount",
    path: ["inputId", "outputId"],
  });

export const validationTransactionUpdate = validationTransactionCreate;
