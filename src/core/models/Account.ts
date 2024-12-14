import { z } from "zod";
import { Transaction } from "./Transaction";
import { User } from "./User";

export interface Account {
  id?: number;
  userId: number;
  title: string;
  createdAt?: Date;

  user?: User;
  inputs?: Transaction[];
  outputs?: Transaction[];
}

export const validationAccountCreate = z.object({
  title: z.string().min(3).max(30),
});

export const validationAccountUpdate = validationAccountCreate;
