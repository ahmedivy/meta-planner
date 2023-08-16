import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      accountId: true,
      image: true,
    },
  });

  return NextResponse.json({
    users,
    success: true,
  });
}
