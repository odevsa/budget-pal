"use client";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { maskDecimal } from "@/core/mask";
import { Account } from "@/core/models/Account";
import { Transaction, TransactionType } from "@/core/models/Transaction";
import { useToast } from "@/hooks/use-toast";
import { SaveIcon, SkipBackIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import GenericDatePicker from "../_components/generic-date-picker";
import { FormActionState } from "../_components/generic-form";
import GenericInput from "../_components/generic-input";
import GenericSelect, {
  GenericSelectItem,
} from "../_components/generic-select";
import { saveAction } from "./actions";

const INITIAL_STATE = {
  description: "",
  value: 0,
  inputId: undefined,
  outputId: undefined,
} as Transaction;

export default function TransactionsFormContent({
  variant = TransactionType.Transfer,
  accounts,
  data,
  onCancel,
  onSuccess,
}: Readonly<{
  variant?: TransactionType;
  accounts: Account[];
  data?: Transaction;
  onCancel?(): void;
  onSuccess?(data: Transaction): void;
}>) {
  const t = useTranslations();
  const { toast } = useToast();
  const [items, setItems] = useState<GenericSelectItem[]>([]);
  const [formData, setFormData] = useState<Transaction>({
    ...INITIAL_STATE,
    ...data,
  });
  const [state, formAction] = useActionState(saveAction, {});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    handleResponse(state);
  }, [state]);

  useEffect(() => {
    setItems(
      accounts.map(
        (account) =>
          ({ label: account.title, value: account.id } as GenericSelectItem)
      )
    );
  }, [accounts]);

  useEffect(() => {
    setFormData({ ...INITIAL_STATE, ...data });
  }, [data]);

  useEffect(() => {
    if (!formData.transactedAt)
      setFormData({ ...formData, transactedAt: new Date() });
  }, [formData]);

  const handleSubmit = () => {
    setLoading(true);
  };

  const handleResponse = (state: FormActionState) => {
    if (!state.success) {
      if (state?.errors?.message)
        toast({
          variant: "destructive",
          title: t("crud.save"),
          description: state.errors.message,
        });

      return;
    }

    toast({
      variant: "success",
      title: t("crud.save"),
      description: t("crud.message.saveSuccess"),
    });

    onSuccess?.(formData);
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      {formData.id && <Input name="id" value={formData.id} type="hidden" />}
      <Loading visible={loading} className="flex flex-col gap-4">
        <GenericInput
          title={t("crud.description")}
          name="description"
          errors={state?.errors?.description}
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
        />

        <div className="flex flex-row gap-2">
          {[TransactionType.Transfer, TransactionType.Pay].includes(
            variant
          ) && (
            <GenericSelect
              className="grow basis-1"
              title={t("transactions.paidFrom")}
              name="outputId"
              errors={state?.errors?.outputId}
              items={items}
              value={formData.outputId?.toString()}
              onChange={(value: any) =>
                setFormData({ ...formData, outputId: value })
              }
            />
          )}
          {[TransactionType.Transfer, TransactionType.Receive].includes(
            variant
          ) && (
            <GenericSelect
              className="grow basis-1"
              title={t("transactions.receivedIn")}
              name="inputId"
              errors={state?.errors?.inputId}
              items={items}
              value={formData.inputId?.toString()}
              onChange={(value: any) =>
                setFormData({ ...formData, inputId: value })
              }
            />
          )}
        </div>

        <div className="flex flex-row gap-2">
          <GenericDatePicker
            className="grow basis-1"
            title={t("transactions.transactedAt")}
            name="transactedAt"
            errors={state?.errors?.transactedAt}
            value={formData.transactedAt}
            onChange={(value) =>
              setFormData({ ...formData, transactedAt: new Date(value) })
            }
          />

          <GenericInput
            className="grow basis-1"
            title={t("transactions.value")}
            name="value"
            align="right"
            errors={state?.errors?.value}
            value={parseFloat(formData?.value.toString()).toFixed(2)}
            mask={maskDecimal}
            onChange={(value) => setFormData({ ...formData, value: value })}
          />
        </div>

        <div className="flex flex-row gap-2 mt-2 justify-end">
          {onCancel && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={onCancel}
            >
              <SkipBackIcon />
              {t("crud.cancel")}
            </Button>
          )}
          <Button variant="success" size="sm" type="submit">
            <SaveIcon />
            {t("crud.save")}
          </Button>
        </div>
      </Loading>
    </form>
  );
}
