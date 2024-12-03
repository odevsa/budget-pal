"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute } from "react";

export default function GenericInput({
  type = "text",
  title,
  name,
  value,
  error,
  onChange,
}: Readonly<{
  type?: HTMLInputTypeAttribute | undefined;
  title: string;
  name: string;
  error?: string;
  value?: any;
  onChange?(value: any): void;
}>) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={`input-${name}`}>{title}</Label>
      <Input
        id={`input-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />
      {error && (
        <span className="text-destructive font-bold text-xs">{error}</span>
      )}
    </div>
  );
}
