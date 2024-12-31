"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Account } from "@/core/models/Account";
import { Category } from "@/core/models/Category";
import { Invoice } from "@/core/models/Invoice";
import { Transaction, TransactionType } from "@/core/models/Transaction";
import StorageFacade from "@/core/storage";
import { useRouter } from "@/i18n/routing";
import { ArrowLeftRightIcon, HandCoinsIcon, ReceiptIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import TransactionsFormContent from "./form-content";

export default function TransactionDialogForm({
  variant = TransactionType.Transfer,
  invoice,
  accounts,
  categories,
  children,
  open = false,
  onOpenChange,
}: Readonly<{
  variant?: TransactionType;
  invoice?: Invoice;
  accounts: Account[];
  categories: Category[];
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}>) {
  const t = useTranslations();
  const router = useRouter();
  const [internalOpened, setInternalOpened] = useState<boolean>(open);
  const [internalData, setInternalData] = useState<Transaction>();
  const [isAbleToLoadStorage, setIsAbleToLoadStorage] = useState<boolean>();

  useEffect(() => {
    setIsAbleToLoadStorage(true);
  }, []);

  useEffect(() => {
    setInternalOpened(open);
  }, [open]);

  useEffect(() => {
    const appendData = invoice
      ? { invoiceTransaction: { invoice }, value: invoice?.value }
      : {};
    setInternalData({
      ...getLastFields(variant),
      ...appendData,
    } as Transaction);
  }, [isAbleToLoadStorage, variant, invoice]);

  const getTitle = (variant: TransactionType) => {
    switch (variant) {
      case TransactionType.Pay:
        return t(`transactions.pay`);
      case TransactionType.Receive:
        return t(`transactions.receive`);
      case TransactionType.InvoicePay:
        return t(`transactions.invoicePay`);
      case TransactionType.InvoiceReceive:
        return t(`transactions.invoiceReceive`);
      default:
        return t(`transactions.transfer`);
    }
  };

  const getIcon = (variant: TransactionType) => {
    switch (variant) {
      case TransactionType.Pay:
        return <ReceiptIcon />;
      case TransactionType.Receive:
        return <HandCoinsIcon />;
      case TransactionType.InvoicePay:
        return <ReceiptIcon />;
      case TransactionType.InvoiceReceive:
        return <HandCoinsIcon />;
      default:
        return <ArrowLeftRightIcon />;
    }
  };

  const getLastFields = (variant: TransactionType): Transaction | undefined => {
    if (!isAbleToLoadStorage) return;

    switch (variant) {
      case TransactionType.Pay:
        return StorageFacade.transactions.getPay();
      case TransactionType.Receive:
        return StorageFacade.transactions.getReceive();
      case TransactionType.InvoicePay:
        return StorageFacade.transactions.getInvoicePay();
      case TransactionType.InvoiceReceive:
        return StorageFacade.transactions.getInvoiceReceive();
      default:
        return StorageFacade.transactions.getTransfer();
    }
  };

  const handleOpenChange = (value: boolean) => {
    setInternalOpened(value);
    onOpenChange?.(value);
  };

  const handleSuccess = (data: Transaction) => {
    switch (variant) {
      case TransactionType.Pay:
        StorageFacade.transactions.setPay(data);
        break;
      case TransactionType.Receive:
        StorageFacade.transactions.setReceive(data);
        break;
      case TransactionType.InvoicePay:
        StorageFacade.transactions.setInvoicePay(data);
        break;
      case TransactionType.InvoiceReceive:
        StorageFacade.transactions.setInvoiceReceive(data);
        break;
      default:
        StorageFacade.transactions.setTransfer(data);
        break;
    }

    setInternalOpened(false);
    router.replace("/");
  };

  return (
    <Dialog open={internalOpened} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 items-center">
            {getIcon(variant)}
            {getTitle(variant)}
          </DialogTitle>
          <DialogDescription>{t("transactions.description")}</DialogDescription>
        </DialogHeader>
        <TransactionsFormContent
          data={internalData}
          variant={variant}
          accounts={accounts}
          categories={categories}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
