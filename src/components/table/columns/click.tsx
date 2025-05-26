import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CourseLinkCell({ id, label }: { id: string; label: string }) {
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams.toString());
  query.set("course_id", id);
  const url = `/course_registration?${query.toString()}`;

  return (
    <Link href={url} className="underline">
      {label}
    </Link>
  );
}
