import { CgMenuLeftAlt } from "react-icons/cg";

import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function PortalMobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="lg:hidden ml-auto cursor-pointer">
          <CgMenuLeftAlt className="font-bold text-3xl" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[260px]">
        <Sidebar className="flex flex-col mx-0 px-0 w-full m-1 p-0" mobile={true} />
      </SheetContent>
    </Sheet>
  );
}

export default PortalMobileNav;
