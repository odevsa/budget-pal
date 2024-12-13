import {
  transactionGetPay,
  transactionGetReceive,
  transactionGetTransfer,
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
  };
}
