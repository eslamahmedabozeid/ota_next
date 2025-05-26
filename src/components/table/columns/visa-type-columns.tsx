"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCellTrue,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { getLocalizedField } from ".";

export function getVisaTypesColumns<T>({
  t,
  tableFor,
  actions,
  setRowAction,
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
          className="translate-y-0.5 mr-3.5 rtl:mr-0 rtl:ml-3.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.id")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          className="w-full text-center flex items-center justify-center"
          value={row.getValue("id")}
        />
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.title")} />
      ),
      cell: ({ row }) => {
        const item = row.original as any;
        return <TableCell value={getLocalizedField(item.title)} />;
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.price")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("price")} />,
    },
    {
      accessorKey: "processing_time",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.processing_time")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("processing_time")} />,
    },
    {
      accessorKey: "validity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.validity")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("validity")} />,
    },
    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.active")} />
      ),
      cell: ({ row }) => (
        <StatusCellTrue
          value={row.getValue("active")}
          name="active"
          t={t}
          styled
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <TableActions
          actions={actions}
          row={row}
          setRowAction={setRowAction}
          tableFor={tableFor}
        />
      ),
      size: 30,
    },
  ];
}
