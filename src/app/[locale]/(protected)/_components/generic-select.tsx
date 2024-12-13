"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectGroup } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import GenericFieldErrors from "./generic-field-errors";

export interface GenericSelectItem {
  value: any;
  label: string;
}

export interface GenericSelectProps extends React.ComponentProps<"select"> {
  items: GenericSelectItem[];
  placeholder?: string;
  errors?: string[];
  mask?(value: any): any;
  onChange?(value: any): any;
}

const GenericSelect = ({
  title,
  name,
  placeholder = "Select a item...",
  value,
  items,
  errors,
  mask,
  onChange,
  className,
}: GenericSelectProps) => {
  const [internalValue, setInternalValue] = useState<any>(value);

  const handleChange = (newValue: any) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setInternalValue(mask ? mask(value) : value);
  }, [value]);

  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <Label htmlFor={`input-${name}`}>{title}</Label>
      <Select name={name} value={internalValue} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.length > 0 ? (
              items.map((item) => (
                <SelectItem
                  key={`${name}-${item.value}`}
                  value={item.value.toString()}
                >
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectLabel>Fruits</SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <GenericFieldErrors errors={errors} />
    </div>
  );
};

export default GenericSelect;
