import { CgMenuLeftAlt } from "react-icons/cg";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function PortalMobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="lg:hidden ml-auto cursor-pointer">
          <CgMenuLeftAlt className="text-2xl" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        
      </SheetContent>
    </Sheet>
  );
}

export default PortalMobileNav;
