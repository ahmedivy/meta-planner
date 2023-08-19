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

export async function getAccountsCount() {
  const res = await fetch(`${URL}/users/current/accounts/count`, {
    method: "GET",
    headers: getApiHeaders(),
  });

  const data = await res.json();
  return data;
}

export async function removeAccount(id) {
  const res = await fetch(`${URL}/users/current/accounts/${id}`, {
    method: "DELETE",
    headers: getApiHeaders(),
  });

  const data = await res.json();
  return data;
}

export async function deployAccount(id) {
  const res = await fetch(`${URL}/users/current/accounts/${id}/deploy`, {
    method: "POST",
    headers: getApiHeaders(),
  });

  return res.status === 204;
}

export async function undeployAccount(id) {
  const res = await fetch(`${URL}/users/current/accounts/${id}/undeploy`, {
    method: "POST",
    headers: getApiHeaders(),
  });

  return res.status === 204;
}