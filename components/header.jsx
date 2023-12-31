import Link from "next/link";
import { TbTriangleInvertedFilled } from "react-icons/tb";

import Nav from "./nav";
import MobileNav from "./mobile-nav";
import AuthButtons from "./auth-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex h-16 w-full items-center gap-6">
      {/* Logo */}
      <Link href="/">
        <div className="flex gap-2 items-center">
          <TbTriangleInvertedFilled className="text-2xl rotate-12" />
          <h1 className="font-black text-2xl">Meta Planner</h1>
        </div>
      </Link>

      {/* Nav */}
      <Nav />

      {/* Auth Buttons */}
      <AuthButtons session={session} />

      {/* Mobile Menu */}
      <MobileNav session = {session}/>
    </header>
  );
}

export default Header;
