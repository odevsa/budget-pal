import { z } from "zod";

export interface Category {
  id?: number;
  userId: number;
  title: string;
  createdAt?: Date;
}

export const validationCategoryCreate = {
  title: z.string().min(3).max(30),
};

export const validationCategoryUpdate = validationCategoryCreate;
