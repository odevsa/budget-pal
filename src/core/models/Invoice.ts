import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { User } from "./User";

export interface Invoice {
  id?: number;
  userId: number;
  title: string;
  value: Decimal | number;
  isInput: boolean;
  isActive: boolean;
  dueDay: number;
  createdAt?: Date;

  user?: User;
}

export const validationInvoiceCreate = z.object({
  title: z.string().min(3).max(30),
  value: z.number().min(0),
  isInput: z.boolean(),
  isActive: z.boolean(),
  dueDay: z.number().min(1).max(31),
});

export const validationInvoiceUpdate = validationInvoiceCreate;
