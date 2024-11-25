"use client";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SaveIcon, SkipBackIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";

export interface FormActionState {
  success?: boolean;
  errors?: any;
}

export default function GenericForm({
  title,
  children,
  action,
  onCancel,
  onResponse,
}: Readonly<{
  title: string;
  children: React.ReactNode;
  action: any;
  onCancel?(): void;
  onResponse?(state: FormActionState): void;
}>) {
  const t = useTranslations();
  const [state, formAction] = useActionState(action, {});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    onResponse?.(state);
  }, [state]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <Loading visible={loading}>
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">{children}</CardContent>
          <CardFooter className="flex flex-row gap-2 justify-end">
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
            {action && (
              <Button variant="success" size="sm" type="submit">
                <SaveIcon />
                {t("crud.save")}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Loading>
  );
}
