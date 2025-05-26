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

export function getReviewsColumns<T>({
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
      accessorKey: "user_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.user_name")} />
      ),
      cell: ({ row }) => (
        <TableCell value={row.getValue("user_name")} className="font-medium" />
      ),
    },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.email")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("email")} />,
    },

    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.phone")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("phone")} />,
    },

    {
      id: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.image")} />
      ),
      cell: ({ row }) => {
        const url = (row.original as any).image;
        return url ? (
          <Image
          src={url?.includes('https://') ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          "-"
        );
      },
    },

    {
      id: "course",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.course")} />
      ),
      cell: ({ row }) => (
        <TableCell value={(row.original as any).course?.title} />
      ),
    },

    {
      accessorKey: "comment",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.comment")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={row.getValue("comment")}
          className="text-muted-foreground max-w-xs line-clamp-2"
        />
      ),
    },

    {
      accessorKey: "rate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.rate")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("rate")} />,
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.status")} />
      ),
      cell: ({ row }) => (
        <StatusCell
          value={row.getValue("status")}
          name="status"
          t={t}
          styled
        />
      ),
    },

    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.createdAt")} />
      ),
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
}
