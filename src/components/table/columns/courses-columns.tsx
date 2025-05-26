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

type CourseRow = {
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
export function getCoursesColumns<T>({
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
      ),
    },

    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.id")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("id")} />,
    },

    {
      accessorKey: "slug",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.slug")} />,
      cell: ({ row }) => <CopyToClipboardCell value={row.getValue("slug")} />,
    },

    {
      id: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.name")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        return<TableCell value={getLocalizedField(course.translations, "title")} />

      }
      ,
    },

    {
      id: "short_info",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.short_info")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        <TableCell
          value={getLocalizedField(course.translations, "short_info")}
          className="text-muted-foreground line-clamp-2 max-w-xs"
        />

      }
      ,
    },

    {
      accessorKey: "thumbnail",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.thumbnail")} />,
      cell: ({ row }) => {
        const url = row.getValue("thumbnail") as string;
        return url ? (
          <Image src={url?.includes('https://') ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL}${url}`} alt="thumbnail" width={60} height={40} className="rounded-md" />
        ) : "-";
      },
    },

    {
      id: "creator",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.creator")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        return course?.creator?.name || "-"},
    },

    {
      id: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.category")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        return course.category?.id ?? "-"},
    },

    {
      id: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.type")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

      return <TableCell value={course.type} />},
    },

    {
      id: "gender",
      header: ({ column }) => <DataTableColumnHeader column={column} title={  t("table.gender")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

      return<TableCell value={course.gender} />},
    },

    {
      id: "branches",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.branches")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        return(course.branches || []).join(", ")},
    },

    {
      id: "available_dates",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.available_dates")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        return(course.available_dates || []).join(", ")},
    },

    {
      id: "brochure",
      header: ({ column }) => <DataTableColumnHeader column={column} title={  t("table.brochure")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;
        const url = course.brochure;
        return url ? <a href={url} target="_blank">Download</a> : "-";
      },
    },

    // {
    //   id: "brief_video",
    //   header: ({ column }) => <DataTableColumnHeader column={column} title={  t("table.brief_video")} />,
    //   cell: ({ row }) => {
    //     const course = row.original as CourseRow;
    //     const url = course.brief_video;
    //     return url ? <a href={url} target="_blank">Watch</a> : "-";
    //   },
    // },

    {
      id: "duration",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.duration")} />,
      cell: ({ row }) => {
        const course = row.original as CourseRow;

        const val = course.duration_value;
        const unit = course.duration_type;
        return `${val} ${unit}`;
      },
    },

    {
      accessorKey: "is_featured",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.is_featured")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("is_featured")} name="is_featured" t={t} styled />
      ),
    },

    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("table.active")} />,
      cell: ({ row }) => (
        <StatusCell value={row.getValue("active")} name="active" t={t} styled />
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
