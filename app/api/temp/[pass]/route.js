import prisma from "@/lib/db";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const pass = params.pass;

  const user = await prisma.user.findUnique({
    where: {
      email: "demoaccount@gmail.com",
    },
  });

  const passResult = await compare(pass, user.password);

  return NextResponse.json({
    passResult,
    user,
  });
}
