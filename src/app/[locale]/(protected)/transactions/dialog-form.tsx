"use client";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeftRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GenericInput from "../_components/generic-input";
import GenericSelect, {
  GenericSelectItem,
} from "../_components/generic-select";
import { Account } from "@/core/models/Account";
import { maskDecimal } from "@/core/mask";
import { TransactionType } from "@/core/models/Transaction";

export interface FormActionState {
  success?: boolean;
  errors?: any;
}

export default function TransactionDialogForm({
  variant = TransactionType.Transfer,
  accounts,
  children,
}: Readonly<{
  variant?: TransactionType;
  accounts: Account[];
  children?: React.ReactNode;
}>) {
  const t = useTranslations();
  // const [state, formAction] = useActionState(action, {});
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<GenericSelectItem[]>([]);

  // useEffect(() => {
  //   setLoading(false);
  //   onResponse?.(state);
  // }, [state]);

  useEffect(() => {
    setItems(
      accounts.map(
        (account) =>
          ({ label: account.title, value: account.id } as GenericSelectItem)
      )
    );
  }, [accounts]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <Dialog>
      <form
        // action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
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
            <DialogTitle>{t(`transactions.${variant}`)}</DialogTitle>
          </DialogHeader>
          <Loading visible={loading} className="flex flex-col gap-4">
            <GenericInput
              title={t("crud.description")}
              name="description"
              error={undefined}
              value={""}
              onChange={(value) => console.log(value)}
            />
            {[TransactionType.Transfer, TransactionType.Pay].includes(
              variant
            ) && (
              <GenericSelect
                title={t("transactions.payFrom")}
                name="output"
                error={undefined}
                items={items}
                onChange={(value: any) => console.log(value)}
              />
            )}
            {[TransactionType.Transfer, TransactionType.Receive].includes(
              variant
            ) && (
              <GenericSelect
                title={t("transactions.receiveTo")}
                name="input"
                error={undefined}
                items={items}
                onChange={(value: any) => console.log(value)}
              />
            )}
            <GenericInput
              title={t("transactions.value")}
              name="value"
              error={undefined}
              value={""}
              mask={maskDecimal}
              className="text-right"
              onChange={(value) => console.log(value)}
            />
          </Loading>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t("crud.cancel")}
              </Button>
            </DialogClose>
            <Button type="submit">{t("crud.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
