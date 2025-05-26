"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface DateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  /**
   * The selected date range.
   * @default undefined
   * @type DateRange
   * @example { from: new Date(), to: new Date() }
   */
  defaultDateRange?: DateRange;

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string;

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">;

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps["size"], "icon">;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string;

  /**
   * Controls whether query states are updated client-side only (default: true).
   * Setting to `false` triggers a network request to update the querystring.
   * @default true
   */
  shallow?: boolean;
}

interface RHFDateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  nameFrom: string;
  nameTo: string;
  label?: string;
  placeholder?: string;
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">;
  triggerSize?: Exclude<ButtonProps["size"], "icon">;
  triggerClassName?: string;
}

export function DateRangePicker({
  nameFrom="from",
  nameTo="to",
  placeholder = "Pick a date",
  triggerVariant = "outline",
  triggerSize = "default",
  label,
  triggerClassName,
  className,
  ...props
}: RHFDateRangePickerProps) {
  const { watch, setValue } = useFormContext();

  const from = watch(nameFrom);
  const to = watch(nameTo);

  // Adjust date creation to handle timezone correctly
  const createDateWithoutTimezone = (dateString: string) => {
    if (!dateString) return undefined;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const date: DateRange = {
    from: from ? createDateWithoutTimezone(from) : undefined,
    to: to ? createDateWithoutTimezone(to) : undefined,
  };

  return (
    <div className="grid gap-2">
      {label && (
        <h3
          className={cn(
            `text-sm text-secondary-700 font-medium flex items-center gap-0.5 whitespace-nowrap  trns `,
          )}
        >
          {label}{" "}
        </h3>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              "w-full justify-start gap-2 truncate text-left font-normal",
              !date && "text-muted-foreground",
              triggerClassName,
            )}
          >
            <CalendarIcon className="size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDateRange) => {
              // Ensure we're using local dates without time component
              setValue(
                nameFrom,
                newDateRange?.from ? format(newDateRange.from, 'yyyy-MM-dd') : ""
              );
              setValue(
                nameTo,
                newDateRange?.to ? format(newDateRange.to, 'yyyy-MM-dd') : ""
              );
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
