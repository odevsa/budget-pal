"use client";

import { Input } from "@/components/ui/input";
import { Category } from "@/core/models/Category";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { TagIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericInput from "../_components/generic-input";
import GenericPage from "../_components/generic-page";
import { saveAction } from "./actions";

const INITIAL_STATE = {
  title: "",
} as Category;

export default function CategoriesForm({
  data = INITIAL_STATE,
}: {
  readonly data?: Category;
}) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormActionState>();
  const [formData, setFormData] = useState<Category>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const backToList = () => {
    router.push("/categories");
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
    <GenericPage title={t("menu.categories")} icon={<TagIcon />}>
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
      </GenericForm>
    </GenericPage>
  );
}
