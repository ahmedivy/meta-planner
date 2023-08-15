import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function AuthButtons({ className = "" }) {
  return (
    <div className={cn("hidden lg:flex gap-4 ml-auto", className)}>
      <Button variant="outline">Log In</Button>
      <Button>Sign Up</Button>
    </div>
  );
}

export default AuthButtons;
