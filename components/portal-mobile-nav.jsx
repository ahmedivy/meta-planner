import { CgMenuLeftAlt } from "react-icons/cg";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

function PortalMobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="lg:hidden ml-auto cursor-pointer">
          <CgMenuLeftAlt className="text-2xl" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <Sidebar className="flex flex-col mx-0 px-2" mobile={true}/>
      </SheetContent>
    </Sheet>
  );
}

export default PortalMobileNav;
