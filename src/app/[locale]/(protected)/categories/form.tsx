"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/core/models/Category";
import { useToast } from "@/hooks/use-toast";
import { WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericPage from "../_components/generic-page";
import { saveAction } from "./actions";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

const INITIAL_STATE = {
  title: "",
} as Category;

export default function CategoriesForm({
  data = INITIAL_STATE,
}: {
  data?: Category;
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
    <GenericPage title={t("menu.categories")} icon={<WalletIcon />}>
      <GenericForm
        title={!formData?.id ? t("crud.create") : t("crud.edit")}
        action={saveAction}
        onResponse={handleResponse}
        onCancel={backToList}
      >
        {data.id && <Input name="id" value={data.id} type="hidden" />}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">{t("crud.title")}</Label>
          <Input
            id="title"
            name="title"
            value={formData?.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.currentTarget.value,
              })
            }
          />
          {formState?.errors?.title && (
            <span className="text-destructive font-bold text-xs">
              {formState.errors.title}
            </span>
          )}
        </div>
      </GenericForm>
    </GenericPage>
  );
}
