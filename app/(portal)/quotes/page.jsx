import Link from "next/link";

import { Button } from "@/components/ui/button";

async function Page() {
  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black">Quotes</h1>
          <p className="text-muted-foreground text-xl">
            Symbols you are tracking and their real time stats
          </p>
        </div>
        <Button asChild className="font-bold" size="lg">
          <Link href="/quotes/configure">Configure Quotes</Link>
        </Button>
      </div>
    </main>
  );
}

export default Page;
