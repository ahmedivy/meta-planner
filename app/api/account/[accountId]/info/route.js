import { NextResponse } from "next/server";

import { getAccountInfo } from "@/lib/meta-api/info";

export async function GET(request, { params }) {
  const { accountId } = params;

  try {
    const info = await getAccountInfo(accountId);

    return NextResponse.json({
      info,
      success: true,
    });
  } catch (e) {
    console.log(`Error fetching account info: ${e.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
