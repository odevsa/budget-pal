"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActionState, useEffect } from "react";

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
  children: any;
  action: any;
  onCancel?(): void;
  onResponse?(state: FormActionState): void;
}>) {
  const [state, formAction] = useActionState(action, {});

  useEffect(() => {
    onResponse?.(state);
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
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
              Cancel
            </Button>
          )}
          {action && (
            <Button variant="success" size="sm" type="submit">
              Save
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
