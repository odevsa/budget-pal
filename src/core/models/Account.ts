import { z } from "zod";

export interface Account {
  id?: number;
  userId: number;
  title: string;
  createdAt?: Date;
}

export const validationAccountCreate = {
  title: z.string().min(3).max(30),
};

export const validationAccountUpdate = validationAccountCreate;
