import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  TableCell,
  StatusCellTrue,
  CopyToClipboardCell,
  TableActions,
} from "@/components/table/ui";
import { TableColumnsProps } from "@/types";

export function getReviewColumns<T>({
  t,
  tableFor,
  actions,
  setRowAction,
}: TableColumnsProps<T>): ColumnDef<T>[] {
  return [
    {
      accessorKey: "id",
      header: t("table.id"),
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      cell: ({ row }) => <TableCell value={row.getValue("name")} />,
    },
    {
      accessorKey: "sub_title",
      header: t("table.sub_title"),
      cell: ({ row }) => <TableCell value={row.getValue("sub_title")} />,
    },
    {
      accessorKey: "comment",
      header: t("table.comment"),
      cell: ({ row }) => <TableCell value={row.getValue("comment")} />,
    },
    {
      accessorKey: "stars",
      header: t("table.stars"),
      cell: ({ row }) => <TableCell value={row.getValue("stars")} />,
    },
    {
      accessorKey: "image",
      header: t("table.image"),
      cell: ({ row }) => {
        const url = row.getValue("image") as string;
        return url ? (
          <Image
            src={url.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`}
            alt="reviewer"
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
      accessorKey: "active",
      header: t("table.active"),
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
      accessorKey: "is_featured",
      header: t("table.is_featured"),
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
      id: "actions",
      size: 30,
      cell: ({ row }) => (
        <TableActions
          actions={actions}
          row={row}
          setRowAction={setRowAction}
          tableFor={tableFor}
        />
      ),
    },
  ];
}
