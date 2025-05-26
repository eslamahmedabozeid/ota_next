"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { IFormElementProps } from "@/types"
import { Controller, useFormContext } from "react-hook-form"
import FieldError from "./FieldError"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function CustomDatePicker({
  name,
  label = "",
  required = true,
  ServerErrors,
  disabled = false,
  className,
}: IFormElementProps) {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const selectedDates = watch(name) || []
  const error = ServerErrors?.response?.data?.errors?.[name]?.[0] || (errors?.[name]?.message as string)

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    const formattedDate = format(date, "yyyy-MM-dd")
    const currentDates = [...selectedDates]

    // Check if date already exists
    const dateIndex = currentDates.indexOf(formattedDate)

    if (dateIndex >= 0) {
      // Remove date if already selected
      currentDates.splice(dateIndex, 1)
    } else {
      // Add date if not already selected
      currentDates.push(formattedDate)
    }

    setValue(name, currentDates, { shouldValidate: true })
  }

  const removeDate = (dateToRemove: string) => {
    const updatedDates = selectedDates.filter((date: string) => date !== dateToRemove)
    setValue(name, updatedDates, { shouldValidate: true })
  }

  const isDateSelected = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    return selectedDates.includes(formattedDate)
  }

  return (
    <div className="w-full space-y-2 pt-4 col-span-2">

    <Label
      className={cn(`w-full flex flex-col items-start gap-1.5`, label ? "min-h-[94px]" : "min-h-[64px]", className)}
      htmlFor={name}
    >
      {label && (
        <h3
          className={cn(
            `text-sm text-secondary-700 font-medium flex items-center gap-0.5 whitespace-nowrap`,
            error && "text-error",
          )}
        >
          {label} {required && <span className="text-[#2318fb] dark:text-[#94969C]">*</span>}
        </h3>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="w-full space-y-4">
            {/* Calendar directly in the form */}
            <div className="border rounded-md p-1">
              <Calendar
                mode="single"
                onSelect={handleDateSelect}
                disabled={disabled}
                modifiers={{
                  selected: (date) => isDateSelected(date),
                }}
                modifiersClassNames={{
                  selected: "bg-primary text-primary-foreground",
                }}
                className="rounded-md"
              />
            </div>

            {/* Selected dates display */}
            {field.value?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {field.value.length} date{field.value.length > 1 ? "s" : ""} selected:
                </p>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((date: string) => (
                    <Badge key={date}  className="flex items-center gap-1">
                      {date}
                      <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeDate(date)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      />
      <FieldError error={error} />
    </Label>
    </div>
  )
}

export default CustomDatePicker
