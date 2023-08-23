"use client";

import { TableCaption } from "./ui/table";
import { useTimeSince } from "@/lib/hooks/useTimeSince";

function TimeSince({ date }) {
  const time = useTimeSince(date);

  return <TableCaption>Updated {time} ago</TableCaption>;
}

export default TimeSince;
