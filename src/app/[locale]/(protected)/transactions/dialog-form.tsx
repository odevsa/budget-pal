"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Account } from "@/core/models/Account";
import { Transaction, TransactionType } from "@/core/models/Transaction";
import { ArrowLeftRightIcon, HandCoinsIcon, ReceiptIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import TransactionsFormContent from "./form-content";
import StorageFacade from "@/core/storage";
import { useEffect, useState } from "react";
import { Category } from "@/core/models/Category";

export default function TransactionDialogForm({
  variant = TransactionType.Transfer,
  accounts,
  categories,
  children,
}: Readonly<{
  variant?: TransactionType;
  accounts: Account[];
  categories: Category[];
  children?: React.ReactNode;
}>) {
  const t = useTranslations();
  const [opened, setOpened] = useState<boolean>();
  const [isAbleToLoadStorage, setIsAbleToLoadStorage] = useState<boolean>();

  useEffect(() => {
    setIsAbleToLoadStorage(true);
  }, []);

  const getIcon = (variant: TransactionType) => {
    switch (variant) {
      case TransactionType.Pay:
        return <ReceiptIcon />;
      case TransactionType.Receive:
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
      default:
        return StorageFacade.transactions.getTransfer();
    }
  };

  const handleSuccess = (data: Transaction) => {
    switch (variant) {
      case TransactionType.Pay:
        StorageFacade.transactions.setPay(data);
        break;
      case TransactionType.Receive:
        StorageFacade.transactions.setReceive(data);
        break;
      default:
        StorageFacade.transactions.setTransfer(data);
        break;
    }

    setOpened(false);
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant={"outline"} size={"xs"}>
            <ArrowLeftRightIcon />
            {t("transactions.transfer")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 items-center">
            {getIcon(variant)}
            {t(`transactions.${variant}`)}
          </DialogTitle>
          <DialogDescription>{t("transactions.description")}</DialogDescription>
        </DialogHeader>
        <TransactionsFormContent
          data={getLastFields(variant)}
          variant={variant}
          accounts={accounts}
          categories={categories}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
