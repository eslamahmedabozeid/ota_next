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

export function getPackagesProgramsColumns<T>({
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
      accessorKey: "lat",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.lat")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("lat")} />,
    },
     {
      accessorKey: "lng",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.lng")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("lng")} />,
    },
    {
      accessorKey: "image",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.thumbnail")} />,
      cell: ({ row }) => {
        const url = row.getValue("image") as string;
        return url ? (
          <div className="flex items-center justify-center gap-2">

            <Image
              src={url.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
              alt="image"
              width={70}
              height={50}
              className="rounded-md"
            />
          </div>
        ) : "-";
      },
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