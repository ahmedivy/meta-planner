import DashCard from "@/components/dash-card";
import StatusBadge from "@/components/status-badge";
import { authOptions } from "@/lib/auth";
import { getAccountInfo } from "@/lib/meta-api/account";
import { getServerSession } from "next-auth";

async function getData() {
  const session = await getServerSession(authOptions);
  const account = await getAccountInfo(session.user.accountId);
  return {
    user: session.user,
    account,
  };
}

async function Page() {

  const {user, account} = await getData();


  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <h1 className="text-3xl font-black">Dashboard</h1>

      <div className="flex flex-col gap-8 py-4 w-full">
        {/* Account Name, Broker and Status */}
        <div className="flex items-center">
          <div className="flex-grow">
            <h1 className="text-xl font-bold">{account.name}</h1>
            <h3 className="text-muted-foreground">Server: {account.server}</h3>
            <h3 className="text-muted-foreground">Broker: {account.broker}</h3>
          </div>
          <StatusBadge status="Connected" />
        </div>

        {/* Account Balance, Margin and others */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
          <DashCard title="Balance" value={account.balance} currency={account.currency} />
          <DashCard title="Margin" value={account.margin} currency={account.currency} />
          <DashCard title="Equity" value={account.equity} currency={account.currency} />
          <DashCard title="Credit" value={account.credit} currency={account.currency} />
          <DashCard title="Free Margin" value={account.freeMargin} currency={account.currency} />
          <DashCard title="Leverage" value={account.leverage} currency={account.currency} />
        </div>
      </div>
    </main>
  );
}

export default Page;
