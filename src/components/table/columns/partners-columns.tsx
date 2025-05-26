"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCellTrue,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

export function getPartnersColumns<T>({
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
      accessorKey: "image_url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.image")} />
      ),
      cell: ({ row }) => {
        const url = row.getValue("image_url") as string;
        return url ? (
       <Image
        src={url?.includes("http")
          ? url
          : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
        alt="service"
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
      accessorKey: "is_featured",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.is_featured")} />
      ),
      cell: ({ row }) => (
        <StatusCellTrue
          value={row.getValue("is_featured") ? "true" : "false"}
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
        <StatusCellTrue
          value={row.getValue("active") ? "true" : "false"}
          name="active"
          t={t}
          styled
        />
      ),
    },
    {
      accessorKey: "order_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.order_number")} />
      ),
      cell: ({ row }) => (
        <TableCell value={row.getValue("order_number")} />
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
