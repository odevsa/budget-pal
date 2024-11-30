import {
  accountAllUseCase,
  accountByIdUseCase,
  accountDeleteUseCase,
  accountSaveUseCase,
  accountTotalUseCase,
} from "./usecases/account";
import {
  categoryAllUseCase,
  categoryByIdUseCase,
  categoryDeleteUseCase,
  categorySaveUseCase,
  categoryTotalUseCase,
} from "./usecases/category";
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
    total: accountTotalUseCase,
    all: accountAllUseCase,
    byId: accountByIdUseCase,
    delete: accountDeleteUseCase,
  };

  static readonly categories = {
    save: categorySaveUseCase,
    total: categoryTotalUseCase,
    all: categoryAllUseCase,
    byId: categoryByIdUseCase,
    delete: categoryDeleteUseCase,
  };
}
