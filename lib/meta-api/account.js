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
