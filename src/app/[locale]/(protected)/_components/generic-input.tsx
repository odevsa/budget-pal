"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, useEffect, useState } from "react";

export interface GenericInputProps extends React.ComponentProps<"input"> {
  error?: string;
  mask?(value: any): any;
  onChange?(value: any): any;
}

const GenericInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  (
    { type = "text", title, name, value = "", error, mask, onChange, ...props },
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
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={`input-${name}`}>{title}</Label>
        <Input
          ref={ref}
          {...props}
          id={`input-${name}`}
          type={type}
          name={name}
          value={internalValue}
          onChange={handleChange}
        />
        {error && (
          <span className="text-destructive font-bold text-xs">{error}</span>
        )}
      </div>
    );
  }
);

export default GenericInput;
