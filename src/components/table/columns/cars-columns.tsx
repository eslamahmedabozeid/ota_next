"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCellTrue,
  ImageCell,
  CopyToClipboardCell,
} from "@/components/table/ui";
import { formatDate } from "@/lib/utils";
import { TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

export function getCarsColumns<T>({
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.id")} />
      ),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.title")} />
      ),
      cell: ({ row }) => {
        const item = row.original as any;
        return <TableCell value={getLocalizedField(item.title)} />;
      },
    },
    // {
    //   accessorKey: "image",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title={t("table.image")} />
    //   ),
    //   cell: ({ row }) => {
    //     const url = row.getValue("image") as string;
    //     return url ? (
    //       <Image
    //         src={url.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
    //         alt="image"
    //         width={70}
    //         height={50}
    //         className="rounded-md"
    //       />
    //     ) : (
    //       "-"
    //     );
    //   },
    // },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.category")} />
      ),
      cell: ({ row }) => (
        <TableCell
          value={getLocalizedField((row.original as any)?.category?.title)}
        />
      ),
    },
    {
      accessorKey: "seats_num",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.seats_num")} />
      ),
    },
    {
      accessorKey: "bags_num",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.bags_num")} />
      ),
    },
    {
      accessorKey: "price_per_day",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.price_per_day")}
        />
      ),
    },
      {
      accessorKey: "automatic",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.automatic")} />
      ),
      cell: ({ row }) => (
        <StatusCellTrue
          value={row.getValue("automatic") ? "true" : "false"} name="status" t={t} styled />
      ),
    },
    {
      accessorKey: "km_rental",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.km_rental")} />
      ),
      cell: ({ row }) => (
        <StatusCellTrue
          value={row.getValue("km_rental") ? 'true' : 'false'} name="status" t={t} styled />
      ),
    },

 {
  accessorKey: "active",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={t("table.active")} />
  ),
  cell: ({ row }) => (
    <StatusCellTrue
      value={row.getValue("active")}
      name="active"
      t={t}
      styled
    />
  ),
},

    {
      id: "actions",
      cell: ({ row }) => (
        <TableActions
          actions={actions}
          row={row}
          setRowAction={setRowAction}
          tableFor={tableFor}
        />
      ),
      size: 30,
    },
  ];
}
