import Link from "next/link";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

const QuotesStreaming = dynamic(() => import("@/components/quotes-streaming"), {
  ssr: false,
});

const getData = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      symbols: true,
    },
  });
  return user.symbols;
};

async function Page() {
  const session = await getServerSession(authOptions);
  const symbols = await getData(session.user.id);

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

      <QuotesStreaming user={session.user} symbols={symbols} />
    </main>
  );
}

export default Page;
