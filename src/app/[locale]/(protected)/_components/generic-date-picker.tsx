"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarCheckIcon, CalendarIcon, ClockIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import GenericFieldErrors from "./generic-field-errors";

export interface GenericDatePickerItem {
  value: any;
  label: string;
}

export interface GenericDatePickerProps {
  title: string;
  name: string;
  placeholder?: string;
  value?: Date;
  className?: string;
  errors?: string[];
  onChange?(value: any): any;
  buttonToday: boolean;
}

const GenericDatePicker = ({
  title,
  name,
  placeholder = "Pick a date...",
  value,
  className,
  errors,
  onChange,
  buttonToday,
}: GenericDatePickerProps) => {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState<Date>();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (date?: Date) => {
    const newValue =
      date && internalValue
        ? appendTime(date, internalValue.getHours(), internalValue.getMinutes())
        : date;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClose = (opened: boolean) => {
    if (!opened) onChange?.(internalValue);
  };

  const appendTime = (date: Date, hours: number, minutes: number) => {
    const newValue = new Date(date);
    newValue.setHours(hours);
    newValue.setMinutes(minutes);
    return newValue;
  };

  const setTime = async (value: Date | undefined) => {
    if (!value || !internalValue) return;
    const newValue = new Date(internalValue);
    setInternalValue(
      appendTime(newValue, value.getHours(), value.getMinutes())
    );
  };

  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <Label htmlFor={`input-${name}`}>{title}</Label>
      {internalValue && (
        <Input name={name} type="hidden" value={internalValue?.toISOString()} />
      )}
      <Popover onOpenChange={handleClose}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-full",
              !internalValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {internalValue ? (
              <span>{format(internalValue, "PPP  HH:mm")}</span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {buttonToday && (
            <Button
              className="w-full"
              variant={"ghost"}
              onClick={() => {
                const chosenDate = new Date();
                setInternalValue(chosenDate);
              }}
            >
              <div className="flex">
                <CalendarCheckIcon className="h-5 w-5 mr-2" />
                Today
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                {format(new Date(), "PPP")}
              </p>
            </Button>
          )}
          <Calendar
            mode="single"
            selected={internalValue}
            onSelect={handleChange}
          />

          <div className="px-4 mb-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <ClockIcon className="h-5 w-5" />
              <p className="text-sm font-medium">Time</p>
            </div>
            <div className="font-medium">
              <div className="flex items-center gap-2">
                <TimePickerInput
                  picker="hours"
                  date={internalValue}
                  setDate={setTime}
                  ref={hourRef}
                  onRightFocus={() => minuteRef.current?.focus()}
                />
                <span>:</span>
                <TimePickerInput
                  picker="minutes"
                  date={internalValue}
                  setDate={setTime}
                  ref={minuteRef}
                  onLeftFocus={() => hourRef.current?.focus()}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <GenericFieldErrors errors={errors} />
    </div>
  );
};

export default GenericDatePicker;
