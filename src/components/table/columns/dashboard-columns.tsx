"use client";

import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch, TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CommonTableColumns, getLocalizedField } from ".";
import { CopyToClipboardCell, StatusCell, TableActions, TableCell } from "../ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CourseLinkCell } from "./click";

export function getDashboardColumns<T>({
  setRowAction,
  actions,
  t,
  tableFor,
}: TableColumnsProps<T>): ColumnDef<T>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.id")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell className="w-full text-center flex items-center justify-center " value={row.getValue("id")} />,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.name")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell className="w-full text-center flex items-center justify-center " value={row.getValue("title")} />,
    },
    {
      accessorKey: "registrations_count",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.count")} />
      ),
      cell: ({ row }) => <TableCell className="w-full text-center flex items-center justify-center " value={row.getValue("registrations_count")} />,
    },
    {
      id: "link",
      header: () => t("table.link"),
      cell: ({ row }) => {
        const courseId = row.getValue("id");
        return <CourseLinkCell id={String(courseId)} label={t("table.courseview")} />;
      },
    },
  ];
}
