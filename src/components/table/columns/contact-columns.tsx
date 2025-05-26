import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  CopyToClipboardCell
} from "@/components/table/ui";
import { cn, formatDate } from "@/lib/utils";
import {TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";
import { TFunction } from "i18next";


 function StatusCell({
  value,
  name,
  t,
  styled,
}: {
  value: string;
  name: string;
  t: TFunction;
  styled?: boolean;
}) {
  // Define status-color map
  const statusStyles: Record<string, string> = {
    new: "text-blue-500 border-blue-500",
    opened: "text-green-500 border-green-500",
    closed: "text-red-500 border-red-500",
  };

  return (
    <h3
      className={cn(
        "text-center mx-auto rounded-full border py-0.5 w-fit px-2.5 capitalize",
        styled ? statusStyles[value] ?? "text-muted border-muted" : ""
      )}
    >
      {t(`table.${name}_${value}`)}
    </h3>
  );
}
export function getContactColumns<T>({
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.id")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.first_name")} />,
      cell: ({ row }) => <TableCell value={row.getValue("first_name")} />,
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.last_name")} />,
      cell: ({ row }) => <TableCell value={row.getValue("last_name")} />,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.type")} />,
      cell: ({ row }) => <TableCell value={row.getValue("type")} />,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.email")} />,
      cell: ({ row }) => <TableCell value={row.getValue("email")} />,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.phone")} />,
      cell: ({ row }) => <TableCell value={row.getValue("phone")} />,
    },
    {
      accessorKey: "message",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.message")} />,
      cell: ({ row }) => (
        <TableCell value={row.getValue("message")} className="line-clamp-2 max-w-sm" />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.status")} />,
      cell: ({ row }) => <StatusCell value={row.getValue("status")} name="status" t={t} styled />,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.created_at")} />,
      cell: ({ row }) => <TableCell value={formatDate(row.getValue("created_at"))} />,
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.updated_at")} />,
      cell: ({ row }) => <TableCell value={formatDate(row.getValue("updated_at"))} />,
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
