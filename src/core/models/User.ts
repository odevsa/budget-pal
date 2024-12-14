import { z } from "zod";
import { Account } from "./Account";
import { Category } from "./Category";
import { Invoice } from "./Invoice";
import { Transaction } from "./Transaction";

export interface User {
  id?: number;
  email: string;
  password?: string;
  name: string;
  image?: string;
  createdAt?: Date;

  accounts?: Account[];
  categories?: Category[];
  invoices?: Invoice[];
  transactions?: Transaction[];
}

export const validationUserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validationUserRegister = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});
