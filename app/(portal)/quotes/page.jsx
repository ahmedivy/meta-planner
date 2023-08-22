import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import QuotesRPC from "@/components/quotes-rpc";
import { getSymbolsPrices } from "@/lib/meta-api/account";

async function getData(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { symbols: true, accountId: true },
  });
  const prices = await getSymbolsPrices(user.symbols, user.accountId);
  return prices;
}

async function Page() {
  const session = await getServerSession(authOptions);
  const prices = await getData(session.user.id);

  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black">Quotes</h1>
          <p className="text-muted-foreground text-xl">
            Symbols you are tracking and their prices
          </p>
        </div>
        <Button asChild className="font-bold" size="lg">
          <Link href="/quotes/configure">Configure Quotes</Link>
        </Button>
      </div>

      <QuotesRPC prices={prices} />
      {/* <pre>{JSON.stringify(prices, null, 2)}</pre> */}
    </main>
  );
}

export default Page;
