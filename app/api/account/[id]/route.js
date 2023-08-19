// import { NextResponse } from "next/server";
// import MetaApi from "metaapi.cloud-sdk";

// export async function GET(request, { params }) {
//   const { id } = params;

//   const token = process.env.META_API_TOKEN;
//   const api = new MetaApi(token);

//   const account = await api.metatraderAccountApi.getAccount(id);

//   if (account.connectionStatus === "DISCONNECTED") {
//     console.log("Deploying account " + id);
//     await account.deploy();
//   }

//   console.log("Waiting for account " + id + " to connect to broker");
//   await account.waitConnected();

//   const connection = account.getRPCConnection();

//   await connection.connect();

//   console.log(
//     "Waiting for SDK to synchronize to terminal state for account " + id
//   );
//   await connection.waitSynchronized();

//   const accountInfo = connection.getAccountInformation();

//   return NextResponse.json(accountInfo.balance);
// }
