import { getApiHeaders } from "../utils";

const URL = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

export async function getAccountInfo(id, refresh = false) {
  const res = await fetch(
    `${URL}/users/current/accounts/${id}/account-information?refreshTerminalState=${refresh}`,
    {
      method: "GET",
      headers: getApiHeaders(),
    }
  );

  if (res.status !== 200) {
    throw new Error("Failed to get account info");
  }

  const data = await res.json();
  return data;
}

export async function getSymbols(id) {
  const res = await fetch(`${URL}/users/current/accounts/${id}/symbols`, {
    method: "GET",
    headers: getApiHeaders(),
  });

  if (res.status !== 200) {
    throw new Error("Failed to get symbols");
  }

  const data = await res.json();
  return data;
}

// /users/current/accounts/:accountId/symbols/:symbol/current-price
export async function getSymbolPrice(symbol, id) {
  const res = await fetch(
    `${URL}/users/current/accounts/${id}/symbols/${symbol}/current-price`,
    {
      method: "GET",
      headers: getApiHeaders(),
    }
  );

  const data = await res.json();

  if (res.status !== 200) {
    console.log(data);
    throw new Error("Failed to get symbol price");
  }

  return data;
}

export async function getSymbolsPrices(symbols, id) {
  const promises = symbols.map((symbol) => getSymbolPrice(symbol, id));
  const prices = await Promise.all(promises);

  return prices;
}
