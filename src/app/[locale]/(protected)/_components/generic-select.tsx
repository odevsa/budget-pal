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
import { SelectGroup } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";

export interface GenericSelectItem {
  value: any;
  label: string;
}

export interface GenericSelectProps extends React.ComponentProps<"select"> {
  items: GenericSelectItem[];
  placeholder?: string;
  error?: string;
  mask?(value: any): any;
  onChange?(value: any): any;
}

const GenericSelect = ({
  title,
  name,
  placeholder = "Select a item",
  value,
  items,
  error,
  mask,
  onChange,
}: GenericSelectProps) => {
  const [internalValue, setInternalValue] = useState<any>(value);
  const handleChange = (value: any) => {
    setInternalValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    setInternalValue(mask ? mask(value) : value);
  }, [value]);

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={`input-${name}`}>{title}</Label>
      <Select name={name} value={internalValue} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.length > 0 ? (
              items.map((item) => (
                <SelectItem key={`${name}-${item.value}`} value={item.value}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectLabel>Fruits</SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <span className="text-destructive font-bold text-xs">{error}</span>
      )}
    </div>
  );
};

export default GenericSelect;
