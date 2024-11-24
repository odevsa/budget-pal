import {
  accountAllUseCase,
  accountByIdUseCase,
  accountDeleteUseCase,
  accountSaveUseCase,
} from "./usecases/account";
import {
  userByEmailUseCase,
  userSaveUseCase,
  userVerifyUseCase,
} from "./usecases/users";

export default class BackendFacade {
  static readonly users = {
    save: userSaveUseCase,
    byEmail: userByEmailUseCase,
    verify: userVerifyUseCase,
  };

  static readonly accounts = {
    save: accountSaveUseCase,
    all: accountAllUseCase,
    byId: accountByIdUseCase,
    delete: accountDeleteUseCase,
  };
}
