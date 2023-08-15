import { HiOutlineMenuAlt3 } from "react-icons/hi";

import Nav from "./nav";
import AuthButtons from "./auth-buttons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="lg:hidden ml-auto cursor-pointer">
          <HiOutlineMenuAlt3 className="text-2xl" />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-screen">
        <AuthButtons className="w-full flex flex-col gap-2 my-6" />
        <nav>
          <Nav className="flex flex-col gap-3 w-full my-4 items-start px-3" mobile={true}/>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
