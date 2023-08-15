import { cn } from "@/lib/utils";
import Link from "next/link";

function Nav({ className = "", mobile = false }) {
  return (
    <nav
      className={cn(
        "hidden items-center gap-4 lg:flex text-muted-foreground text-md font-semibold",
        className
      )}
    >
      <Link href="/features" className={mobile ? "border-b-2 w-full pb-2" : ""}>
        Features
      </Link>
      <Link href="/about" className={mobile ? "border-b-2 w-full pb-2" : ""}>
        About
      </Link>
      <Link
        href="/customers"
        className={mobile ? "border-b-2 w-full pb-2" : ""}
      >
        Customers
      </Link>
      <Link href="/pricing" className={mobile ? "border-b-2 w-full pb-2" : ""}>
        Pricing
      </Link>
      <Link
        href="/integrations"
        className={mobile ? "border-b-2 w-full pb-2" : ""}
      >
        Integrations
      </Link>
    </nav>
  );
}

export default Nav;
