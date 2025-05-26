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

export function getReservationsColumns<T>({
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.first_name")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("first_name")} />,
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.last_name")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("last_name")} />,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.phone")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("phone")} />,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.email")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("email")} />,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.type")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("type")} />,
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.country")} />
      ),
      cell: ({ row }) => {
        const country = (row.original as any)?.country;
        return <TableCell value={getLocalizedField(country?.name)} />;
      },
    },
    {
      accessorKey: "visa_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.visa_type")} />
      ),
      cell: ({ row }) => {
        const visa = (row.original as any)?.visaType;
        return <TableCell value={getLocalizedField(visa?.title)} />;
      },
    },
    {
      accessorKey: "total_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.total_price")} />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.statusColumns")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={t(`table.status.options.${row.getValue("status")}`)}
        />
      ),
    },
    {
      accessorKey: "is_paid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.is_paidColumns")} />
      ),
      cell: ({ row }) => (
        <StatusCellTrue
          value={row.getValue("is_paid")}
          name="is_paid"
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
