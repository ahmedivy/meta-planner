import { getApiHeaders } from "../utils";

const URL = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";

export async function getAccounts() {
  const res = await fetch(`${URL}/users/current/accounts`, {
    method: "GET",
    headers: getApiHeaders(),
  });

  const data = await res.json();
  return data;
}

export async function getAccount(id) {
  const res = await fetch(`${URL}/users/current/accounts/${id}`, {
    method: "GET",
    headers: getApiHeaders(),
  });

  const data = await res.json();
  return data;
}
