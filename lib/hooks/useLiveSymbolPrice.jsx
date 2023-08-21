import { useState, useRef, useEffect } from "react";
import MetaApi, { SynchronizationListener } from "metaapi.cloud-sdk";

const token = process.env.NEXT_PUBLIC_META_API_TOKEN;

export function useLiveSymbolPrices(accountId, symbols) {
  const [prices, setPrices] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectionRef = useRef(null);

  useEffect(() => {
    class QuoteListener extends SynchronizationListener {
      async onSymbolPriceUpdated(instanceIndex, price) {
        if (Object.keys(prices).includes(price.symbol)) {
          setPrices((prev) => ({
            ...prev,
            [price.symbol]: {
              name: price.symbol,
              ask: price.ask,
              bid: price.bid,
              askIncreased: price.ask >= prev[price.symbol].ask,
              bidIncreased: price.bid >= prev[price.symbol].bid,
              time: price.time,
              profitTickValue: price.profitTickValue,
              lossTickValue: price.lossTickValue,
            }
          }));
        }
      }
      async onCandlesUpdated(instanceIndex, candles) {}
      async onTicksUpdated(instanceIndex, ticks) {}
      async onBooksUpdated(instanceIndex, books) {}
      async onSubscriptionDowngraded(
        instanceIndex,
        _symbol,
        updates,
        unsubscriptions
      ) {
        console.log(
          "Market prices subscriptions for " +
            _symbol +
            " were downgraded by the server due to rate limits"
        );
      }
    }

    const connectToApi = async () => {
      const api = new MetaApi(token);
      const account = await api.metatraderAccountApi.getAccount(accountId);

      if (account.state !== "DEPLOYED") {
        await account.deploy();
      }

      if (account.connectionStatus !== "CONNECTED") {
        await account.waitConnected();
      }
      const connection = account.getStreamingConnection();
      const quoteListener = new QuoteListener();
      connection.addSynchronizationListener(quoteListener);
      await connection.connect();
      await connection.waitSynchronized();
      return connection;
    };

    const makeRequest = async () => {
      try {
        connectionRef.current = await connectToApi();
        console.log("Connected");
        for (const symbol of symbols) {
          await connectionRef.current.subscribeToMarketData(symbol, [
            { type: "quotes", intervalInMilliseconds: 1000 },
            { type: "candles", timeframe: "1m", intervalInMilliseconds: 10000 },
            { type: "ticks" },
            { type: "marketDepth", intervalInMilliseconds: 5000 },
          ]);
          const currentPrice = connectionRef.current.terminalState.price(symbol);

          if (!currentPrice) {
            continue;
          }

          setPrices((prev) => ({
            ...prev,
            [symbol]: {
              name: symbol,
              ask: currentPrice.ask,
              bid: currentPrice.bid,
              askIncreased: true,
              bidIncreased: true,
              time: currentPrice.time,
              profitTickValue: currentPrice.profitTickValue,
              lossTickValue: currentPrice.lossTickValue,
            }
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    const connect = async () => {
      try {
        await makeRequest();
      } catch (err) {
        console.log(err);
      } finally {
        setIsConnecting(false);
      }
    };

    const dissconnect = async () => {
      if (connectionRef.current) {
        for (const symbol of symbols) {
          await connectionRef.current.unsubscribeFromMarketData(symbol, [
            { type: "quotes" },
            { type: "candles", timeframe: "1m" },
            { type: "ticks" },
            { type: "marketDepth" },
          ]);
        }
      }
    };

    if (isConnecting && !isConnected) {
      connect()
        .then(() => setIsConnected(true))
        .catch(() => setIsConnected(false))
        .finally(() => setIsConnecting(false));
    }

    return dissconnect;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, symbols, isConnected, isConnecting]);

  return [prices, isConnected, setIsConnecting];
}
