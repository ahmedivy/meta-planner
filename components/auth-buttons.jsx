"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function AuthButtons({ session, className = "" }) {

  return (
    <div className={cn("hidden lg:flex gap-4 ml-auto", className)}>
      {!session ? (
        <>
          <Button variant="outline" asChild tabIndex="-1">
            <Link href="/login">Log In</Link>
          </Button>
          <Button tabIndex="-1">Sign Up</Button>
        </>
      ) : (
        <>
          <Button variant="outline" tabIndex="-1" onClick={signOut}>
            Sign Out
          </Button>
          <Button tabIndex="-1" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default AuthButtons;
