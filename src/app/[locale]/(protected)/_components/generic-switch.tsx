"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import React from "react";
import GenericFieldErrors from "./generic-field-errors";

export interface GenericSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  errors?: string[];
}

const GenericSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  GenericSwitchProps
>(({ title, name, errors = [], ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {title && <Label htmlFor={`input-${name}`}>{title}</Label>}
      <Switch {...props} ref={ref} id={`input-${name}`} name={name} />
      <GenericFieldErrors errors={errors} />
    </div>
  );
});

export default GenericSwitch;
