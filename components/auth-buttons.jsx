import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

function AuthButtons({ className = "" }) {
  return (
    <div className={cn("hidden lg:flex gap-4 ml-auto", className)}>
      <Button variant="outline" asChild tabIndex="-1">
        <Link href="/login">Log In</Link>
      </Button>
      <Button tabIndex="-1">Sign Up</Button>
    </div>
  );
}

export default AuthButtons;
