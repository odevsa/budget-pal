"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import React from "react";

export interface GenericSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  error?: string;
}

const GenericSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  GenericSwitchProps
>(({ title, name, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={`input-${name}`}>{title}</Label>
      <Switch {...props} ref={ref} id={`input-${name}`} name={name} />
      {error && (
        <span className="text-destructive font-bold text-xs">{error}</span>
      )}
    </div>
  );
});

export default GenericSwitch;
