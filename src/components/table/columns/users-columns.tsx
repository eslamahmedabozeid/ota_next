"use client";

import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch, TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CommonTableColumns, getLocalizedField } from ".";
import { CopyToClipboardCell, StatusCell, TableActions, TableCell } from "../ui";
import { formatDate } from "@/lib/utils";

export function getUsersColumns<T>({
  setRowAction,
  actions,
  t,
  tableFor,
}: TableColumnsProps<T>): ColumnDef<T>[] {
console.log(tableFor);

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
          className="translate-y-0.5 mr-3.5 rtl:mr-0 rtl:ml-3.5"
        />
      ),
      cell: ({ row }) => {

        return<Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />

      }
      ,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.id")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.first_name")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          value={row.getValue("first_name")}
          className="w-40"
        />
      ),
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.last_name")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          value={row.getValue("last_name")}
          className="w-40"
        />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.email")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          value={row.getValue("email")}
          className="w-80"
        />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.phone")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell value={row.getValue("phone")} className="w-fit" />
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