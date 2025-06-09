import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      login: true,
      name: true,
      password: true,
      documents: true,
      role: true,
    },
  });

  if (!users.length) {
    return NextResponse.json(
      { message: "Пользователи не найдены" },
      { status: 404 },
    );
  }

  return NextResponse.json({ users }, { status: 200 });
}
