import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/ui/column-header";
import {
  TableActions,
  TableCell,
  StatusCell,
  CopyToClipboardCell
} from "@/components/table/ui";
import { formatDate } from "@/lib/utils";
import {TableColumnsProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getLocalizedField } from ".";

type CertificationRow = {
  id: number | string;
  slug?: string;
  translations?: any[];
  thumbnail?: string;
  creator?: { name?: string };
  category?: { id?: number | string };
  type: string;
  gender: string;
  branches?: string[];
  available_dates?: string[];
  brochure?: string;
  brief_video?: string;
  duration_value?: string | number;
  duration_type?: string;
  is_featured?: boolean;
  active?: boolean;
};
export function getCoursesCertificationsColumns<T>({
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      )
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.id")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />
    },
    {
      id: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.title")} />,
      cell: ({ row }) => {
        const cert = row.original as CertificationRow;
        return <TableCell value={getLocalizedField(cert.translations, "title")} />;
      }
    },
    {
      id: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.description")} />,
      cell: ({ row }) => {
        const cert = row.original as CertificationRow;
        return (
          <TableCell
            value={getLocalizedField(cert.translations, "description")}
            className="text-muted-foreground line-clamp-2 max-w-xl"
          />
        );
      }
    },
    {
      accessorKey: "course_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.course_id")} />,
      cell: ({ row }) => <TableCell value={row.getValue("course_id")} />
    },
    {
      accessorKey: "course_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.course")} />,
      cell: ({ row }) => <TableCell value={(row.original as any)?.course?.title} />
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
      accessorKey: "certificate_url",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.certificate_url")} />,
      cell: ({ row }) => {
        const url = row.getValue("certificate_url") as string;
        return url ? <a href={url?.includes("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`} className="text-primary underline" target="_blank">View</a> : "-";
      }
    },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.active")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active")} name="active" t={t} styled />
      )
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
      size: 30
    }
  ];
}

