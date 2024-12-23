import {
  accountAllUseCase,
  accountByIdUseCase,
  accountDeleteUseCase,
  accountPageUseCase,
  accountSaveUseCase,
  accountTotalUseCase,
} from "./usecases/account";
import {
  categoryAllUseCase,
  categoryByIdUseCase,
  categoryDeleteUseCase,
  categoryPageUseCase,
  categorySaveUseCase,
  categoryTotalUseCase,
} from "./usecases/category";
import {
  invoiceAllUseCase,
  invoiceByIdUseCase,
  invoiceDeleteUseCase,
  invoicePageUseCase,
  invoiceSaveUseCase,
  invoiceTotalUseCase,
} from "./usecases/invoices";
import {
  reportBalanceUseCase,
  reportMonthlyInvoicesUseCase,
  reportMonthlySummaryUseCase,
} from "./usecases/reports";
import {
  transactionAllUseCase,
  transactionByIdUseCase,
  transactionDeleteUseCase,
  transactionPageUseCase,
  transactionSaveUseCase,
  transactionTotalUseCase,
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

  static readonly reports = {
    monthlySummary: reportMonthlySummaryUseCase,
    monthlyInvoices: reportMonthlyInvoicesUseCase,
    balance: reportBalanceUseCase,
  };
}
