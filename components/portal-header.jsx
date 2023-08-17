import Link from "next/link";
import { getServerSession } from "next-auth";
import { TbTriangleInvertedFilled } from "react-icons/tb";

import UserAvatar from "./user-avatar";
import { authOptions } from "@/lib/auth";
import PortalMobileNav from "./portal-mobile-nav";

async function PortalHeader() {
  const session = await getServerSession(authOptions);
  const { name, email, image } = session?.user;

  return (
    <header className="flex h-16 w-full items-center gap-6">
      {/* <MobileNav /> */}
      <PortalMobileNav />

      {/* Logo */}
      <Link href="/" className="hidden lg:block">
        <div className="flex gap-2 items-center">
          <TbTriangleInvertedFilled className="text-2xl rotate-12" />
          <h1 className="font-black text-2xl">Meta Planner</h1>
        </div>
      </Link>

      {/* Avatar */}
      <div className="ml-auto mt-2">
        <UserAvatar name={name} email={email} image={image} />
      </div>

    </header>
  );
}

export default PortalHeader;
