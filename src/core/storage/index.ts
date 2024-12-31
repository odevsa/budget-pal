import {
  transactionGetInvoicePay,
  transactionGetInvoiceReceive,
  transactionGetPay,
  transactionGetReceive,
  transactionGetTransfer,
  transactionSetInvoicePay,
  transactionSetInvoiceReceive,
  transactionSetPay,
  transactionSetReceive,
  transactionSetTransfer,
} from "./transactions";

export default class StorageFacade {
  static readonly transactions = {
    setTransfer: transactionSetTransfer,
    getTransfer: transactionGetTransfer,
    setPay: transactionSetPay,
    getPay: transactionGetPay,
    setReceive: transactionSetReceive,
    getReceive: transactionGetReceive,
    setInvoicePay: transactionSetInvoicePay,
    getInvoicePay: transactionGetInvoicePay,
    setInvoiceReceive: transactionSetInvoiceReceive,
    getInvoiceReceive: transactionGetInvoiceReceive,
  };
}
