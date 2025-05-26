"use client";

import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import FormLayout from "@/components/form/layout";
import { RowDetailsView } from "@/components/table/ui/row-details-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { queryClient } from "@/providers/query-client-instance";
import { CrudOperation, DataTableRowAction, FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { ZodType } from "zod";
import { TABLE_FORM_SCHEMA_MAP } from "@/lib/schemas/tablesFormsSchemas/tables.schema";
const SUPPORTED_LOCALES = ["en", "ar"];

interface CreateUpdateViewSheetProps<TData> {
  rowAction: DataTableRowAction<TData> | null;
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<TData> | null>
  >;
  formFields: FormTabSection[];
  tableFor: string;
  tableQuery: Record<CrudOperation, string>;
  t: TFunction;
}

export default function CreateUpdateViewSheet<TData>({
  rowAction,
  setRowAction,
  formFields,
  tableFor,
  tableQuery,
  t,
}: CreateUpdateViewSheetProps<TData>) {
  const formSchema = TABLE_FORM_SCHEMA_MAP[tableFor](
    t,
    rowAction?.type === "create" ? "create" : "update"
  );
  console.log("formSchema", formFields);
  

  function transformTranslatedDataToFormValues(
    data: any,
    translatedKeys: string[] = ["title"]
  ) {
    const transformed: Record<string, any> = {};
  
    for (const key of translatedKeys) {
      transformed[key] = {};
      for (const locale of SUPPORTED_LOCALES) {
        const translation = data.translations?.find((t: any) => t.locale === locale);
        transformed[key][locale] = translation?.[key] ?? "";
      }
    }
  
    return {
      ...data,
      ...transformed,
    };
  }

  function extractTranslatedKeysFromFormFields(formFields: FormTabSection[]): string[] {
    const translatedKeys = new Set<string>();
  
    formFields.forEach((section) => {
      section.fields.forEach((field) => {
        const nameParts = field.name.split(".");
        // Only include keys with structure like `title.en`, `short_info.ar`, etc.
        if (nameParts.length === 2 && SUPPORTED_LOCALES.includes(nameParts[1])) {
          translatedKeys.add(nameParts[0]);
        }
      });
    });
  
    return Array.from(translatedKeys);
  }
  
  return (
    <Sheet
      open={
        rowAction?.type === "create" ||
        rowAction?.type === "update" ||
        rowAction?.type === "view"
      }
      onOpenChange={() => setRowAction(null)}
    >
      <SheetContent
        className={cn(
          " sm:max-w-xl  bg -blue-400",
          rowAction?.type === "view" && "sm:max-w-xl"
        )}
      >
        <SheetHeader className=" mb-5">
          <SheetTitle>
            <SheetDescription>
              {rowAction?.type === "create"
                ? "Create"
                : rowAction?.type === "update"
                  ? "Update"
                  : "View"}{" "}
              {/* task */}
            </SheetDescription>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-tssah bg -green-300 p -3">
          {rowAction?.type === "view" ? (
            <RowDetailsView
              data={rowAction.row.original}
              className="min-h-tssah"
              t={t}
            />
          ) : (
            <FormLayout
              sections={formFields}
              schema={formSchema}
              endpointQuery={
                rowAction?.type === "create"
                  ? tableQuery.create
                  : tableQuery.update
              }
              onSuccess={() => {
                setRowAction(null);
                queryClient.refetchQueries({
                  queryKey: [tableQuery.get],
                });
              }}
              defaultValues={rowAction?.row.original ?? {}}

              className="h-tssah " //* add the same height here to push the submit button to the very bottom
              //title="g"
            />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
