import { z } from "zod";

export interface User {
  id?: number;
  email: string;
  password?: string;
  name: string;
  image?: string;
  createdAt?: Date;
}

export const validationUserLogin = {
  email: z.string().email(),
  password: z.string().min(6),
};

export const validationUserRegister = {
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
};
