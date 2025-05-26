"use client";

import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch, TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CommonTableColumns, getLocalizedField } from ".";
import { CopyToClipboardCell, ImageCell, StatusCell, TableActions, TableCell } from "../ui";

export function getCourseCategoriesColumns<T>({
  setRowAction,
  actions,
  t,
  tableFor,
}: TableColumnsProps<T>): ColumnDef<T>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 mr-3.5 rtl:mr-0 rtl:ml-3.5 "
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5 "
        />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.id")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell className="w-full text-center flex items-center justify-center " value={row.getValue("id")} />,
    },
    {
      accessorKey: "translations",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.name")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          value={getLocalizedField(row.getValue("translations"))}
          className="w-full text-center flex items-center justify-center "
        />
      ),
    },
    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.active")} />
      ),
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active")} name="active" t={t} styled />
      ),
    },
    {
      accessorKey: "target",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.target")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("target")} />,
      size: 20,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.type")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("type")} />,
      size: 20,
    },

    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <TableActions
            actions={actions}
            row={row}
            setRowAction={setRowAction}
            tableFor={tableFor}
          />
        );
      },
      size: 30,
    },
  ];
}
