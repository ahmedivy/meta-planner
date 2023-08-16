import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

function AuthButtons({ className = "" }) {
  return (
    <div className={cn("hidden lg:flex gap-4 ml-auto", className)}>
      <Button variant="outline" asChild tabindex="-1">
        <Link href="/login">Log In</Link>
      </Button>
      <Button tabindex="-1">Sign Up</Button>
    </div>
  );
}

export default AuthButtons;
