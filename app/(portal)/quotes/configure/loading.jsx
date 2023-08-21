import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function Page() {
  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <h1 className="text-3xl font-black">Configure Quotes</h1>
      <p className="text-muted-foreground text-xl">
        Add or remove symbols to be displayed in the Quotes page.
      </p>

      <Skeleton className="w-full h-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
        {Array(30)
          .fill()
          .map((_, i) => (
            <Card className="shadow-none rounded-lg" key={i}>
              <CardContent className="w-full flex justify-between p-8">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-12" />
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
}

export default Page;
