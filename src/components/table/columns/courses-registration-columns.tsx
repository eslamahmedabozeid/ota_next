"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import { TableActions, TableCell, StatusCell, CopyToClipboardCell } from "@/components/table/ui";
import { formatDate } from "@/lib/utils";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

export function getCoursesRegistrationColumns<T>({
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
      cell: ({ row }) => <TableCell value={row.getValue("user_name")} />,
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
      accessorKey: "national_id_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.national_id_number")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("national_id_number")} />,
    },

    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.type")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("type")} />,
    },

    {
      accessorKey: "employees_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.employees_number")} />
      ),
      cell: ({ row }) => <TableCell value={row.getValue("employees_number")} />,
    },

    {
      accessorKey: "message",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.message")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={row.getValue("message")}
          className="text-muted-foreground line-clamp-2 max-w-xs"
        />
      ),
    },

    {
      id: "course_slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.course")} />
      ),
      cell: ({ row }) => (
        <TableCell
        className=" max-w-xs"
        value={(row.original as any).course_title} />
      ),
    },

    {
      id: "course_thumbnail",
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
