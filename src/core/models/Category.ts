import { z } from "zod";
import { Transaction } from "./Transaction";
import { User } from "./User";

export interface Category {
  id?: number;
  userId: number;
  title: string;
  createdAt?: Date;

  user?: User;
  transactions?: Transaction[];
}

export const validationCategoryCreate = z.object({
  title: z.string().min(3).max(30),
});

export const validationCategoryUpdate = validationCategoryCreate;
