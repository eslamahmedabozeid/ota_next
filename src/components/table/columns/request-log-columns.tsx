"use client";

import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch, TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CommonTableColumns, getLocalizedField } from ".";
import { CopyToClipboardCell, StatusCell, TableActions, TableCell } from "../ui";
import { formatDate } from "@/lib/utils";

export function getRequestLogColumns<T>({
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
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.id")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },
    {
      accessorKey: "requestId",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.requestId")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("requestId")} />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.status")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("status")} name="status" t={t} styled />
      ),
    },
    {
      accessorKey: "statusLabel",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.statusLabel")} />,
      cell: ({ row }) => <TableCell value={row.getValue("statusLabel")} />,
    },
    {
      accessorKey: "notes",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.notes")} />,
      cell: ({ row }) => <TableCell value={row.getValue("notes")} />,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.createdAt")} />,
      cell: ({ cell }) => formatDate(cell.getValue() as string),
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
;
}