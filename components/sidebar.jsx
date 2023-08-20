"use client";

import Link from "next/link";
import { useMemo } from "react";
import { signOut } from "next-auth/react";
import { FaHistory } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { BsFillBarChartFill } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";


import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import SidebarItem from "./sidebar-item";

function Sidebar({ className = "", mobile = false }) {
  const path = usePathname();

  const routes = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: MdSpaceDashboard,
        active: path === "/dashboard",
      },
      {
        name: "Quotes",
        path: "/quotes",
        icon: FaChartLine,
        active: path.startsWith("/quotes"),
      },
      {
        name: "Trades",
        path: "/trades",
        icon: BsFillBarChartFill,
        active: path.startsWith("/trades"),
      },
      {
        name: "History",
        path: "/history",
        icon: FaHistory,
        active: path.startsWith("/history"),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <nav
      className={cn(
        "hidden w-[280px] h-full lg:flex lg:flex-col gap-2 px-2 py-4 ml-3",
        className
      )}
    >
      {mobile ? (
        <Link href="/">
          <div className="flex gap-2 items-center mb-5">
            <TbTriangleInvertedFilled className="text-2xl rotate-12" />
            <h1 className="font-black text-2xl">Meta Planner</h1>
          </div>
        </Link>
      ) : null}

      {routes.map((route) => (
        <SidebarItem key={route.path} {...route} />
      ))}

      {mobile ? (
        <Button
            onClick={signOut}
            className="w-full mt-auto align-bottom"
        >
            Sign Out
        </Button>
      ) : null}
    </nav>
  );
}

export default Sidebar;
