"use client";

import Link from "next/link";
import { Card, CardContent } from "./ui/card";

function Price({ price, color }) {
  const priceString = price.toString();

  const third = priceString.slice(-1);
  const second = priceString.slice(-3, -1);
  const first = priceString.slice(0, -3);

  return (
    <p className={`text-md lg:text-xl font-semibold ${color}`}>
      <span>{first}</span>
      <span className="text-lg lg:text-2xl">
        {second}
        <sup className="text-md lg:text-xl">{third}</sup>
      </span>
    </p>
  );
}

function QuoteCard({
  symbol,
  ask,
  bid,
  askPriceIncreased = true,
  bidPriceIncreased = true,
}) {
  const askColor = askPriceIncreased ? "text-blue-500" : "text-red-500";
  const bidColor = bidPriceIncreased ? "text-blue-500" : "text-red-500";

  return (
    <Link href={`/trades/${symbol}`} passHref>
      <Card className="shadow-none rounded-lg border-0 lg:border lg:hover:bg-accent cursor-pointer">
        <CardContent className="w-full flex justify-between py-6 lg:py-8 px-0 lg:px-8 items-center">
          <p className="text-lg lg:text-2xl font-semibold lg:font-bold">
            {symbol}
          </p>
          <div className="flex gap-6 items-center">
            <Price price={ask} color={askColor} />
            <Price price={bid} color={bidColor} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default QuoteCard;
