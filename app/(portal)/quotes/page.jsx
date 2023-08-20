import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getSymbols } from "@/lib/meta-api/account";

async function getData() {
  const session = await getServerSession(authOptions);
  const { user } = session;
  const symbols = await getSymbols(user.accountId);

  return {
    symbols,
  };
}

async function Page() {
  const { symbols } = await getData();

  return (
    <main>
      <pre>{JSON.stringify(symbols, null, 2)}</pre>
    </main>
  );
}

export default Page;
