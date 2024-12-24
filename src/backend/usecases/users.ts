"use server";

import UserRepository from "@/backend/repositories/UserRepository";
import { User } from "@/core/models/User";
import { prepareObjectToSate } from "@/lib/utils";

const SALT_ROUNDS = 10;

export async function userSaveUseCase(data: User): Promise<User | undefined> {
  const bcrypt = require("bcrypt");
  const newData = { ...prepareObjectToSate(data) };
  if (data.password)
    newData.password = await bcrypt.hash(data.password, SALT_ROUNDS);

  return await UserRepository.save(newData);
}

export async function userByEmailUseCase(
  email: string
): Promise<User | undefined> {
  return await UserRepository.byEmail(email);
}

export async function userVerifyUseCase(
  email: string,
  password: string
): Promise<boolean> {
  const bcrypt = require("bcrypt");
  const user = await UserRepository.byEmail(email);
  if (!user?.password) return false;

  return await bcrypt.compare(password, user.password);
}
