"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  startName: string;
  endName: string;
  className?: string;
};

export default function DatePickerWithRange({ startName, endName, className }: Props) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { theme: mode } = useTheme();

  const currentRange = {
    from: getValues(startName) ? new Date(getValues(startName)) : undefined,
    to: getValues(endName) ? new Date(getValues(endName)) : undefined,
  };

  const startError = errors?.[startName]?.message;
  const endError = errors?.[endName]?.message;

  return (
    <Controller
      control={control}
      name={startName} // dummy name
      render={() => (
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                color={mode === "dark" ? "secondary" : "default"}
                className={cn(
                  "font-normal",
                  {
                    "bg-white text-default-600": mode !== "dark",
                    "border border-red-500": !!startError || !!endError,
                  }
                )}
              >
                <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                {currentRange.from ? (
                  currentRange.to ? (
                    <>
                      {format(currentRange.from, "LLL dd, y")} -{" "}
                      {format(currentRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(currentRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={currentRange}
                defaultMonth={currentRange.from}
                numberOfMonths={2}
                onSelect={(range) => {
                  setValue(startName, range?.from ? format(range.from, "yyyy-MM-dd") : "");
                  setValue(endName, range?.to ? format(range.to, "yyyy-MM-dd") : "");
                }}
              />
            </PopoverContent>
          </Popover>
          {(startError || endError) && (
            <span className="text-sm text-red-500">
              {startError?.toString() || endError?.toString()}
            </span>
          )}
        </div>
      )}
    />
  );
}
