import { api } from "./api";


export async function getAccounts() {
  const accounts = await api.metatraderAccountApi.getAccounts();
  return accounts.map((account) => ({
    id: account.id,
    name: account.name,
    login: account.login,
  }));
}

export async function getAccount(accountId) {
  const account = await api.metatraderAccountApi.getAccount(accountId);
  return account;
}
