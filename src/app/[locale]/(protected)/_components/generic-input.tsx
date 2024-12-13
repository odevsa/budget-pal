"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useEffect, useState } from "react";
import GenericFieldErrors from "./generic-field-errors";

export interface GenericInputProps extends React.ComponentProps<"input"> {
  errors?: string[];
  mask?(value: any): any;
  align?: "left" | "center" | "right";
  onChange?(value: any): any;
}

const GenericInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  (
    {
      type = "text",
      title,
      name,
      value = "",
      className,
      errors,
      mask,
      align,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = mask ? mask(e.currentTarget.value) : e.currentTarget.value;
      setInternalValue(value);
      onChange?.(value);
    };

    useEffect(() => {
      setInternalValue(mask ? mask(value) : value);
    }, [value]);

    return (
      <div className={cn("flex flex-col space-y-1.5", className)}>
        <Label htmlFor={`input-${name}`}>{title}</Label>
        <Input
          ref={ref}
          {...props}
          id={`input-${name}`}
          type={type}
          name={name}
          value={internalValue}
          onChange={handleChange}
          className={cn(align ? `text-${align}` : "")}
        />
        <GenericFieldErrors errors={errors} />
      </div>
    );
  }
);

export default GenericInput;
