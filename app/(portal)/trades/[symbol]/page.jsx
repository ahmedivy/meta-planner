import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getSymbolDetails } from "@/lib/meta-api/account";

async function Page({ params }) {
  const { symbol } = params;
  const session = await getServerSession(authOptions);
  const data = await getSymbolDetails(symbol, session.user.accountId);

  return (
    <div>
      <h1>Hello Page</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Page;
