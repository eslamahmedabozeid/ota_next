"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCell,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { formatDate } from "@/lib/utils";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

export function getCoursesCurriculumsColumns<T>({
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
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },

    {
      id: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.slug")} />
      ),
      cell: ({ row }) => (
        <CopyToClipboardCell
          value={(row.original as any).course?.slug}
          className="w-40"
        />
      ),
    },
    
    {
      id: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.coursetitle")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={(row.original as any)?.course?.translation?.title}
          className="font-medium"
        />
      ),
    },
    {
      id: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.title")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={getLocalizedField((row.original as any).translations, "title")}
          className="font-medium"
        />
      ),
    },
    
    {
      id: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.description")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={getLocalizedField((row.original as any).translations, "description")}
          className="text-muted-foreground line-clamp-2 max-w-xs"
        />
      ),
    },
    
    {
      id: "thumbnail",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.thumbnail")} />
      ),
      cell: ({ row }) => {
        const url = (row.original as any).course?.thumbnail;
        return url ? (
          <Image
          src={url?.includes('https://') ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
            alt="thumbnail"
            width={60}
            height={40}
            className="rounded-md object-cover"
          />
        ) : (
          "-"
        );
      },
    },
    
    {
      id: "is_featured",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.featured")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={(row.original as any).course?.is_featured}
          name="is_featured"
          t={t}
          styled
        />
      ),
    },

    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.active")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("active")}
          name="active"
          t={t}
          styled
        />
      ),
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
}
