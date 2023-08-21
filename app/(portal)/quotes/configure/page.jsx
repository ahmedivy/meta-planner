import { getServerSession } from "next-auth";

import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import EditQuotes from "@/components/edit-quotes";
import { getSymbols } from "@/lib/meta-api/account";

async function getData() {
  const session = await getServerSession(authOptions);
  const symbols = await getSymbols(session.user.accountId);

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      symbols: true,
    },
  });

  return symbols
    .map((symbol) => ({
      name: symbol,
      isOn: user.symbols.includes(symbol),
    }))
    .sort((a, b) => {
      if (a.isOn === b.isOn) {
        return 0;
      }

      if (a.isOn) {
        return -1;
      }

      return 1;
    });
}

async function Page() {
  const symbols = await getData();

  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <h1 className="text-3xl font-black">Configure Quotes</h1>
      <p className="text-muted-foreground text-xl">
        Add or remove symbols to be displayed in the Quotes page.
      </p>

      <EditQuotes availableSymbols={symbols} />
    </main>
  );
}

export default Page;
