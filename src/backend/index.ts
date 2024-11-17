import {
  accountByIdUseCase,
  accountDeleteUseCase,
  accountListUseCase,
  accountSaveUseCase,
} from "./usecases/account";
import { userByEmailUseCase, userSaveUseCase } from "./usecases/users";

export default class BackendFacade {
  static readonly users = {
    save: userSaveUseCase,
    byEmail: userByEmailUseCase,
  };

  static readonly accounts = {
    save: accountSaveUseCase,
    list: accountListUseCase,
    byId: accountByIdUseCase,
    delete: accountDeleteUseCase,
  };
}