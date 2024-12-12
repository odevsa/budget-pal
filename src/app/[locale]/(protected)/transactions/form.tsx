"use client";

import { Input } from "@/components/ui/input";
import { maskDecimal, maskMonthDay } from "@/core/mask";
import { Transaction } from "@/core/models/Transaction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { WalletIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericInput from "../_components/generic-input";
import GenericPage from "../_components/generic-page";
import GenericSwitch from "../_components/generic-switch";
import { saveAction } from "./actions";

const INITIAL_STATE = {
  description: "",
  value: 0,
  dueDay: 1,
} as Transaction;

export default function TransactionsForm({
  data = INITIAL_STATE,
}: Readonly<{
  data?: Transaction;
}>) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormActionState>();
  const [formData, setFormData] = useState<Transaction>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const backToList = () => {
    router.push("/transactions");
  };

  const handleResponse = (state: FormActionState) => {
    setFormState(state);

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

    backToList();
  };

  return (
    <GenericPage title={t("menu.transactions")} icon={<WalletIcon />}>
      <GenericForm
        title={!formData?.id ? t("crud.create") : t("crud.edit")}
        action={saveAction}
        onResponse={handleResponse}
        onCancel={backToList}
      >
        {data.id && <Input name="id" value={data.id} type="hidden" />}
        <GenericInput
          title={t("crud.description")}
          name="description"
          error={formState?.errors?.description}
          value={formData?.description}
          onChange={(value) =>
            setFormData({
              ...formData,
              description: value,
            })
          }
        />

        <GenericInput
          title={t("transactions.value")}
          name="value"
          error={formState?.errors?.value}
          value={parseFloat(formData?.value.toString()).toFixed(2)}
          mask={maskDecimal}
          className="text-right"
          onChange={(value) =>
            setFormData({
              ...formData,
              value: value,
            })
          }
        />
      </GenericForm>
    </GenericPage>
  );
}
