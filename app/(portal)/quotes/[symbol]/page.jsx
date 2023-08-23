import Link from "next/link";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import { getSymbolDetails } from "@/lib/meta-api/account";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { timeSince } from "@/lib/utils";
import TimeSince from "@/components/time-since";

async function Page({ params }) {
  const { symbol } = params;
  const session = await getServerSession(authOptions);
  const data = await getSymbolDetails(symbol, session.user.accountId);

  const rows = [
    {
      name: "Ask Price",
      value: data.ask,
    },
    {
      name: "Bid Price",
      value: data.bid,
    },
    {
      name: "Loss Tick Value",
      value: Math.round(data.lossTickValue, 4),
    },
    {
      name: "Profit Tick Value",
      value: Math.round(data.profitTickValue, 4),
    },
    {
      name: "Initial Margin",
      value: data.initialMargin,
    },
    {
      name: "Maintenance Margin",
      value: data.maintenanceMargin,
    },
    {
      name: "Tick Size",
      value: data.tickSize,
    },
    {
      name: "Min Volume",
      value: data.minVolume,
    },
    {
      name: "Max Volume",
      value: data.maxVolume,
    },
    {
      name: "Volume Step",
      value: data.volumeStep,
    },
    {
      name: "Margin Currency",
      value: data.marginCurrency,
    },
    {
      name: "Profit Currency",
      value: data.profitCurrency,
    },
  ];

  return (
    <main className="w-full lg:pl-6 pt-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black">{symbol}</h1>
          <p className="text-muted-foreground text-xl">{data.description}</p>
        </div>
        <Button className="font-bold text-md" size="lg">
          <HiPlus className="w-5 h-5 mr-2" />
          Place Order
        </Button>
      </div>

      <Table>
        <TimeSince date={data.time} />
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-right font-bold">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </main>
  );
}

export default Page;
