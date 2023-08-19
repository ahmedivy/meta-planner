import AccountCard from "@/components/account-card";

async function Page() {

  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <h1 className="text-3xl font-black">Dashboard</h1>

      <AccountCard />
    </main>
  );
}

export default Page;
