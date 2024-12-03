"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function GenericSwitch({
  type = "button",
  title,
  name,
  value,
  error,
  onChange,
}: Readonly<{
  type?: "submit" | "reset" | "button" | undefined;
  title: string;
  name: string;
  error?: string;
  value?: any;
  onChange?(value: any): void;
}>) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={`input-${name}`}>{title}</Label>
      <Switch
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
