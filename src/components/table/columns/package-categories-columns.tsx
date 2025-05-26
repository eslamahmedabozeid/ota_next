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

export function getPackageCategoriesColumns<T>({
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
          className="translate-y-0.5 "
        />
      ),
    },
    
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.id")} />,
      cell: ({ row }) => <CopyToClipboardCell className="w-full text-center flex items-center justify-center " value={row.getValue("id")} />,
    },
        {
          accessorKey: "image",
          header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.image")} />,
          cell: ({ row }) => {
            const url = row.getValue("image") as string;
            return url ? (
              <div className="w-full flex items-center justify-center">

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
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.title")} />,
      cell: ({ row }) => {
        const item = row.original as any;
        return <TableCell value={getLocalizedField(item.title)} />;
      },
    },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.active")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active") ? "active" : "inactive"} name="active" t={t} styled />
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