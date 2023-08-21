"use client";

import { useLiveSymbolPrices } from "@/lib/hooks/useLiveSymbolPrice";
import { useEffect } from "react";
import QuoteCard from "./quote-card";

function QuotesStreaming({ user, symbols }) {
  const [prices, isConnected, setIsConnecting] = useLiveSymbolPrices(
    user.accountId,
    symbols
  );

  useEffect(() => {
    setIsConnecting(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 w-full gap-4 pt-6">
      {Object.values(prices).map((price) => (
        <QuoteCard
          key={price.name}
          symbol={price.name}
          ask={price.ask}
          bid={price.bid}
          askPriceIncreased={price.askIncreased}
          bidPriceIncreased={price.bidIncreased}
        />
      ))}
    </div>
  );
}

export default QuotesStreaming;
