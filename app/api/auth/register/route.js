import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const res = await request.json();

    const {} = res;

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(`Register User Error: ${error}`);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
