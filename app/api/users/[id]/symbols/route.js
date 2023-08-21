import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function PUT(request, { params }) {
  const id = params.id;

  const data = await request.json();

  const user = await prisma.user.update({
    where: { id },
    data: {
      symbols: data.symbols,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function GET(request, { params }) {
  const id = params.id;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      symbols: true,
    },
  });

  return NextResponse.json({
    success: true,
    symbols: user.symbols,
  });
}
