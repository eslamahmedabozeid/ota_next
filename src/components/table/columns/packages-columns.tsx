"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCell,
  ImageCell,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { formatDate } from "@/lib/utils";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

export function getPackagesColumns<T>({
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
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.id")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.title")} />,
      cell: ({ row }) => {
        const item = row.original as any;
        return <TableCell value={getLocalizedField(item.title)} />;
      },
    },
    {
      accessorKey: "thumbnail_image",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.thumbnail")} />,
      cell: ({ row }) => {
        const url = row.getValue("thumbnail_image") as string;
        return url ? (
          <Image
            src={url.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
            alt="image"
            width={70}
            height={50}
            className="rounded-md"
          />
        ) : "-";
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.category")} />,
      cell: ({ row }) => <TableCell value={getLocalizedField((row.original as any)?.category?.title)} />,
    },
    {
      accessorKey: "city",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.city")} />,
      cell: ({ row }) => <TableCell value={getLocalizedField((row.original as any)?.city?.name)} />,
    },
    {
      accessorKey: "price_from",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.price_from")} />,
    },
    {
      accessorKey: "price_to",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.price_to")} />,
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.active")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("is_active") ? "active" : "inactive"} name="is_active" t={t} styled />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <TableActions actions={actions} row={row} setRowAction={setRowAction} tableFor={tableFor} />
      ),
      size: 30,
    },
  ];
}