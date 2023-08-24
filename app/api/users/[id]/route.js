import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(req, {params}) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json(user);
}
