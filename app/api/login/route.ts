import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { login, password } = res;
    const user = await prisma.user.findFirst({
      where: { login },
    });
    if (!user || user.password !== password) {
      return NextResponse.json(
        { statusText: "Неверный логин или пароль" },
        { status: 401 },
      );
    }
    const response = NextResponse.json({
      status: "success",
      message: "Успешный вход",
      user,
    });
    response.cookies.set("userId", String(user.id), { path: "/" });
    response.cookies.set("userRole", String(user.role), { path: "/" });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { statusText: "Error", error: error.message },
      { status: 400 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
