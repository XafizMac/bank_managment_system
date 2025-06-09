import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  try {
    const res = await request.json();
    const { id } = res;

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Пользователь успешно удален." },
      { status: 204 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: "Ошибка при удалении пользователя" });
  }
}
