import QuoteCard from "./quote-card";

function QuotesRPC({ prices }) {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 w-full gap-4 pt-6">
      {prices.map((price) => (
        <QuoteCard
          key={price.symbol}
          symbol={price.symbol}
          ask={price.ask}
          bid={price.bid}
        />
      ))}
    </div>
  );
}

export default QuotesRPC;
