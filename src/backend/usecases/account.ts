"use server";

import AccountRepository from "@/backend/repositories/AccountRepository";
import { Account } from "@/core/models/Account";

export async function accountSaveUseCase(data: Account): Promise<Account> {
  return await AccountRepository.save(data);
}

export async function accountListUseCase(): Promise<any> {
  return await AccountRepository.list();
}

export async function accountByIdUseCase(id: number): Promise<Account> {
  return await AccountRepository.byId(id);
}

export async function accountDeleteUseCase(id: number): Promise<any> {
  return await AccountRepository.delete(id);
}
