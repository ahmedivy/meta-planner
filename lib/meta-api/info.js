import { getAccount } from "./accounts";

export async function getAccountInfo(accountId) {
  const account = await getAccount(accountId);

  if (account.connectionStatus === "DISCONNECTED") {
    console.log("Deploying account " + accountId);
    await account.deploy();
  }

  console.log("Waiting for account " + accountId + " to connect to broker");
  await account.waitConnected();

  connection = account.getRPCConnection();

  await connection.connect();

  console.log(
    "Waiting for SDK to synchronize to terminal state for account " + accountId
  );
  await connection.waitSynchronized();

  return connection.getAccountInformation();
}
