import {
  accountPageUseCase,
  accountByIdUseCase,
  accountDeleteUseCase,
  accountSaveUseCase,
  accountTotalUseCase,
  accountAllUseCase,
} from "./usecases/account";
import {
  categoryPageUseCase,
  categoryByIdUseCase,
  categoryDeleteUseCase,
  categorySaveUseCase,
  categoryTotalUseCase,
  categoryAllUseCase,
} from "./usecases/category";
import {
  invoicePageUseCase,
  invoiceByIdUseCase,
  invoiceDeleteUseCase,
  invoiceSaveUseCase,
  invoiceTotalUseCase,
  invoiceAllUseCase,
} from "./usecases/invoices";
import {
  transactionPageUseCase,
  transactionByIdUseCase,
  transactionDeleteUseCase,
  transactionSaveUseCase,
  transactionTotalUseCase,
  transactionAllUseCase,
} from "./usecases/transactions";
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
    page: accountPageUseCase,
    byId: accountByIdUseCase,
    delete: accountDeleteUseCase,
  };

  static readonly categories = {
    save: categorySaveUseCase,
    total: categoryTotalUseCase,
    all: categoryAllUseCase,
    page: categoryPageUseCase,
    byId: categoryByIdUseCase,
    delete: categoryDeleteUseCase,
  };

  static readonly invoices = {
    save: invoiceSaveUseCase,
    total: invoiceTotalUseCase,
    all: invoiceAllUseCase,
    page: invoicePageUseCase,
    byId: invoiceByIdUseCase,
    delete: invoiceDeleteUseCase,
  };

  static readonly transactions = {
    save: transactionSaveUseCase,
    total: transactionTotalUseCase,
    all: transactionAllUseCase,
    page: transactionPageUseCase,
    byId: transactionByIdUseCase,
    delete: transactionDeleteUseCase,
  };
}
