"use client";

import { Input } from "@/components/ui/input";
import { maskDecimal, maskMonthDay } from "@/core/mask";
import { Invoice } from "@/core/models/Invoice";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { ReceiptIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericInput from "../_components/generic-input";
import GenericPage from "../_components/generic-page";
import GenericSwitch from "../_components/generic-switch";
import { saveAction } from "./actions";

const INITIAL_STATE = {
  title: "",
  value: 0,
  dueDay: 1,
  isInput: false,
  isActive: true,
} as Invoice;

export default function InvoicesForm({
  data = INITIAL_STATE,
}: Readonly<{
  readonly data?: Invoice;
}>) {
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
    <GenericPage title={t("menu.invoices")} icon={<ReceiptIcon />}>
      <GenericForm
        title={!formData?.id ? t("crud.create") : t("crud.edit")}
        action={saveAction}
        onResponse={handleResponse}
        onCancel={backToList}
      >
        {formData.id && <Input name="id" value={formData.id} type="hidden" />}
        <GenericInput
          title={t("crud.title")}
          name="title"
          errors={formState?.errors?.title}
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
          name="value"
          errors={formState?.errors?.value}
          value={parseFloat(formData?.value.toString()).toFixed(2)}
          mask={maskDecimal}
          align="right"
          onChange={(value) =>
            setFormData({
              ...formData,
              value: value,
            })
          }
        />

        <GenericInput
          title={t("invoices.dueDay")}
          name="dueDay"
          type="number"
          min={1}
          max={31}
          errors={formState?.errors?.dueDay}
          value={formData?.dueDay}
          mask={maskMonthDay}
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
          errors={formState?.errors?.isInput}
          checked={formData?.isInput}
          onCheckedChange={(value) =>
            setFormData({
              ...formData,
              isInput: value,
            })
          }
        />

        <GenericSwitch
          title={t("invoices.isActive")}
          name="isActive"
          errors={formState?.errors?.isActive}
          checked={formData?.isActive}
          onCheckedChange={(value) =>
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
