"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Account } from "@/core/models/Account";
import { useToast } from "@/hooks/use-toast";
import { WalletIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GenericForm, { FormActionState } from "../_components/generic-form";
import GenericPage from "../_components/generic-page";
import { saveAction } from "./actions";

const INITIAL_STATE = {
  title: "",
} as Account;

export default function AccountsForm({
  data = INITIAL_STATE,
}: {
  data?: Account;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormActionState>();
  const [formData, setFormData] = useState<Account>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const backToList = () => {
    router.push("/accounts");
  };

  const handleResponse = (state: FormActionState) => {
    setFormState(state);

    if (!state.success) {
      if (state?.errors?.message)
        toast({
          variant: "destructive",
          title: "Save",
          description: state.errors.message,
        });

      return;
    }

    toast({
      variant: "success",
      title: "Save",
      description: `Successfully saved!`,
    });

    backToList();
  };

  return (
    <GenericPage title="Accounts" icon={<WalletIcon />}>
      <GenericForm
        title={!formData?.id ? "Create" : "Edit"}
        action={saveAction}
        onResponse={handleResponse}
        onCancel={backToList}
      >
        {data.id && <Input name="id" value={data.id} type="hidden" />}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Account title"
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
