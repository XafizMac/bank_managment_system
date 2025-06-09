import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { name, login, password, role } = res;

    const existingUser = await prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Пользователь с таким именем уже существует" },
        { status: 401 },
      );
    }

    await prisma.user.create({
      data: {
        name,
        login,
        password,
        role,
      },
    });

    return NextResponse.json(
      { message: "Пользователь успешно создан." },
      { status: 201 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: "Ошибка при создании пользователя" });
  }
}
