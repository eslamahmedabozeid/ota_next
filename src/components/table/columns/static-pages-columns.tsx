"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

export function getStaticPagesColumns<T>({
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
        <CopyToClipboardCell value={row.getValue("id")} />
      ),
    },
    {
      accessorKey: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.slug")} />
      ),
      cell: ({ row }) => (
        <TableCell value={row.getValue("slug")} />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.name")} />
      ),
      cell: ({ row }) => {
        const rowData = row.original as any;
        return <TableCell value={getLocalizedField(rowData.name)} />;
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.title")} />
      ),
      cell: ({ row }) => {
        const rowData = row.original as any;
        return <TableCell value={getLocalizedField(rowData.title)} />;
      },
    },
    {
      accessorKey: "sub_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.sub_title")} />
      ),
      cell: ({ row }) => {
        const rowData = row.original as any;
        return <TableCell value={getLocalizedField(rowData.sub_title)} />;
      },
    },
    {
      accessorKey: "action_button_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.action_button_title")} />
      ),
      cell: ({ row }) => {
        const rowData = row.original as any;
        return <TableCell value={getLocalizedField(rowData.action_button_title)} />;
      },
    },
    {
      accessorKey: "main_image_url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.main_image")} />
      ),
      cell: ({ row }) => {
        const url = row.getValue("main_image_url") as string;
        return url ? (
          <Image
            src={url}
            alt="main_image"
            width={70}
            height={50}
            className="rounded-md object-cover"
          />
        ) : (
          "-"
        );
      },
    },
    {
      accessorKey: "image_url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.image")} />
      ),
      cell: ({ row }) => {
        const url = row.getValue("image_url") as string;
        return url ? (
          <Image
            src={url}
            alt="image"
            width={70}
            height={50}
            className="rounded-md object-cover"
          />
        ) : (
          "-"
        );
      },
    },
    {
      accessorKey: "video_url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.video")} />
      ),
      cell: ({ row }) => {
        const url = row.getValue("video_url") as string;
        return url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {t("table.view_video")}
          </a>
        ) : (
          "-"
        );
      },
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
