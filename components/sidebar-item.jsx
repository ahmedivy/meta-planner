"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

function SidebarItem({ icon: Icon, name, path, active }) {
  return (
    <Link
      href={path}
      className={cn(
        "flex w-full h-9 items-center hover:bg-accent text-accent-foreground rounded-sm p-3 gap-2 text-md font-semibold transition-all duration-200 ease-in-out",
        active ? "bg-accent text-accent-foreground" : ""
      )}
    >
      <Icon className="w-4 h-4" />
      <p> {name}</p>
    </Link>
  );
}

export default SidebarItem;
