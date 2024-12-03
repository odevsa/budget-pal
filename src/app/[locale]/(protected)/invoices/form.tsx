"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Invoice } from "@/core/models/Invoice";
import { useToast } from "@/hooks/use-toast";
import { WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericPage from "../_components/generic-page";
import { saveAction } from "./actions";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import GenericInput from "../_components/generic-input";
import GenericSwitch from "../_components/generic-switch";

const INITIAL_STATE = {
  title: "",
  value: 0,
  isInput: false,
  isActive: true,
} as Invoice;

export default function InvoicesForm({
  data = INITIAL_STATE,
}: {
  data?: Invoice;
}) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormActionState>();
  const [formData, setFormData] = useState<Invoice>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const backToList = () => {
    router.push("/invoices");
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
    <GenericPage title={t("menu.invoices")} icon={<WalletIcon />}>
      <GenericForm
        title={!formData?.id ? t("crud.create") : t("crud.edit")}
        action={saveAction}
        onResponse={handleResponse}
        onCancel={backToList}
      >
        {data.id && <Input name="id" value={data.id} type="hidden" />}
        <GenericInput
          title={t("crud.title")}
          name="title"
          error={formState?.errors?.title}
          value={formData?.title}
          onChange={(value) =>
            setFormData({
              ...formData,
              title: value,
            })
          }
        />

        <GenericInput
          title={t("invoices.value")}
          type="number"
          name="value"
          error={formState?.errors?.value}
          value={formData?.value}
          onChange={(value) =>
            setFormData({
              ...formData,
              value: value,
            })
          }
        />

        <GenericInput
          title={t("invoices.dueDay")}
          type="number"
          name="dueDay"
          error={formState?.errors?.dueDay}
          value={formData?.dueDay}
          onChange={(value) =>
            setFormData({
              ...formData,
              dueDay: value,
            })
          }
        />

        <GenericSwitch
          title={t("invoices.isInput")}
          name="isInput"
          error={formState?.errors?.isInput}
          value={formData?.isInput}
          onChange={(value) =>
            setFormData({
              ...formData,
              isInput: value,
            })
          }
        />

        <GenericSwitch
          title={t("invoices.isActive")}
          name="isActive"
          error={formState?.errors?.isActive}
          value={formData?.isActive}
          onChange={(value) =>
            setFormData({
              ...formData,
              isActive: value,
            })
          }
        />
      </GenericForm>
    </GenericPage>
  );
}
