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

export function getDestinationsColumns<T>({
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
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.name")} />,
      cell: ({ row }) => {
        const destination = row.original as any;
        return <TableCell value={getLocalizedField(destination.name)} />;
      },
    },
    {
      accessorKey: "main_image",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.main_image")} />,
      cell: ({ row }) => {
        const url = row.getValue("main_image") as string;
        return url ? (
          <Image
            src={url.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
            alt="main"
            width={70}
            height={50}
            className="rounded-md"
          />
        ) : "-";
      },
    },
    {
      accessorKey: "tags",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.tags")} />,
      cell: ({ row }) => {
        const destination = row.original as any;
        return <TableCell value={getLocalizedField(destination.tags)} />;
      },
    },
    {
      accessorKey: "country",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.country")} />,
      cell: ({ row }) => {
        const destination = row.original as any;
        return <TableCell value={getLocalizedField(destination?.country?.name)} />;
      },
    },
    {
      accessorKey: "temperature",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.temperature")} />,
      cell: ({ row }) => `${row.getValue("temperature")} °C`,
    },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.active")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active") ? "active" : "inactive"} name="active" t={t} styled />
      ),
    },
    {
      accessorKey: "is_featured",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.is_featured")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("is_featured") ? "Yes" : "No"} name="is_featured" t={t} styled />
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return <TableActions actions={actions} row={row} setRowAction={setRowAction} tableFor={tableFor} />;
      },
      size: 30,
    },
  ];
}