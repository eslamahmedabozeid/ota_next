"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { useFormContext } from "react-hook-form";
import { getI18n } from "react-i18next";
import FieldError from "./FieldError";
import { get } from "lodash";

function CustomTextArea({
  name,
  label = "",
  placeholder,
  required = true,
  ServerErrors,
  inputStyle,
  disabled = false,
  className,
  rows = 2,
  isArray = false, // new prop
}: IFormElementProps & { isArray?: boolean }) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const error =
    get(errors, name)?.message ||
    ServerErrors?.response?.data?.errors?.[name]?.[0];
console.log("error", error);

  const locale = getI18n().language;

  // Convert array value to comma-separated string
  const currentValue = getValues(name);
  const displayValue = isArray && Array.isArray(currentValue)
    ? currentValue.join(", ")
    : currentValue || "";

  return (
    <Label
      className={cn(
        `w-full flex flex-col items-start gap-1.5`,
        label ? "min-h-[94px]" : "min-h-[64px]",
        !error && "pb-5",
        className
      )}
      htmlFor={name}
    >
      {label && (
        <h3 className={cn("text-sm font-medium", error && "text-error")}>
          {label}{" "}
          <span className={cn(required ? "text-[#2318fb]" : "text-disabled")}>
            {required ? "*" : locale === "en" ? "(Optional)" : "(اختياري)"}
          </span>
        </h3>
      )}

      <Textarea
  disabled={disabled}
  rows={rows}
  className={cn(
    "w-full px-3.5 rounded-lg text-base placeholder:text-placeholder",
    error && "shadow-error text-error placeholder:text-error",
    inputStyle
  )}
  id={name}
  placeholder={placeholder}
  defaultValue={displayValue}
  onBlur={(e) => {
    const value = e.target.value;
    if (isArray) {
      const parsed = value.split(",").map(s => s.trim()).filter(Boolean);
      setValue(name, parsed, { shouldValidate: true });
    } else {
      setValue(name, value, { shouldValidate: true });
    }
  }}
/>

      <FieldError error={error} />
    </Label>
  );
}


export default CustomTextArea;
