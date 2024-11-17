"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GenericForm({
  title,
  children,
  onSave,
  onCancel,
}: Readonly<{
  title: string;
  children: any;
  onSave?(): void;
  onCancel?(): void;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
        <CardFooter className="flex flex-row gap-2 justify-end">
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onSave && (
            <Button variant="success" size="sm" onClick={onSave}>
              Save
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
