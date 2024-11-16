// import UserByIdUseCase from "./usecases/users/UserByIdUseCase";
// import UserDeleteUseCase from "./usecases/users/UserDeleteUseCase";
// import UserListUseCase from "./usecases/users/UserListUseCase";
// import UserSaveUseCase from "./usecases/users/UserSaveUseCase";

import { accountListUseCase } from "./usecases/account";

export default class BackendFacade {
  static readonly users = {
    // save: UserSaveUseCase.execute,
    // list: UserListUseCase.execute,
    // byId: UserByIdUseCase.execute,
    // delete: UserDeleteUseCase.execute,
  };

  static readonly accounts = {
    // save: AccountSaveUseCase.execute,
    list: accountListUseCase,
    // byId: AccountByIdUseCase.execute,
    // delete: AccountDeleteUseCase.execute,
  };
}
