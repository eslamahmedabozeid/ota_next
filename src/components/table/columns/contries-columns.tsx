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

export function getCountriesColumns<T>({
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
          cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />
        },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.name")} />,
      cell: ({ row }) => {
        const country = row.original as any;
        return <TableCell value={getLocalizedField(country.name)} />;
      },
    },
        {
          accessorKey: "image",
          header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.image")} />,
          cell: ({ row }) => {
            const url = row.getValue("image") as string;
            return url ? (
              <Image
                src={url?.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
                alt="certificate"
                width={70}
                height={50}
                className="rounded-md"
              />
            ) : "-";
          }
        },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.active")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active") ? "active" : "inactive"} name="active" t={t} styled />
      ),
    },
    {
      accessorKey: "tags",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.tags")} />,
      cell: ({ row }) => {
        const country = row.original as any;
        return <TableCell value={getLocalizedField(country.tags)} />;
      },
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