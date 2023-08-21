"use client";

import { Card, CardContent } from "./ui/card";

function Price({ price, color }) {
  const priceString = price.toString();

  const third = priceString.slice(-1);
  const second = priceString.slice(-3, -1);
  const first = priceString.slice(0, -3);

  return (
    <p className={`text-xl lg:text-3xl font-bold ${color}`}>
      <span>{first}</span>
      <span className="text-3xl lg:text-5xl">
        {second}
        <sup className="text-xl lg:text-3xl">{third}</sup>
      </span>
    </p>
  );
}

function QuoteCard({ symbol, ask, bid, askPriceIncreased, bidPriceIncreased}) {

  const askColor = askPriceIncreased ? "text-blue-500" : "text-red-500";
  const bidColor = bidPriceIncreased ? "text-blue-500" : "text-red-500";

  return (
    <Card className="shadow-none rounded-lg border-0 lg:border">
      <CardContent className="w-full flex justify-between py-6 lg:py-8 px-0 lg:px-8 items-center">
        <p className="text-2xl font-bold lg:font-black">{symbol}</p>
        <div className="flex gap-6 items-center">
          <Price price={ask} color = {askColor}/>
          <Price price={bid} color = {bidColor} />
        </div>
      </CardContent>
    </Card>
  );
}

export default QuoteCard;
