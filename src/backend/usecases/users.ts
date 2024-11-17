"use server";

import UserRepository from "@/backend/repositories/UserRepository";
import { User } from "@/core/models/User";

export async function userSaveUseCase(data: User): Promise<User | undefined> {
  return await UserRepository.save(data);
}

export async function userByEmailUseCase(
  email: string
): Promise<User | undefined> {
  return await UserRepository.byEmail(email);
}
