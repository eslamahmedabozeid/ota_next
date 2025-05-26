"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCellTrue,
  ImageCell,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { getLocalizedField } from ".";

export function getcarcategoriesColumns<T>({
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
      accessorKey: "icon",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.icon")} />
      ),
      cell: ({ row }) => {
        const icon = row.getValue("icon") as string;
        return (
          <ImageCell
            src={
              icon?.includes("http")
                ? icon
                : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${icon}`
            }
            alt="icon"
            thumbnailSize={{ width: 30, height: 30 }}
            fullSize={{ width: 100, height: 100 }}
          />
        );
      },
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
