import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const userId = request.cookies.get("userId")?.value;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            documents: true
        }
    })

    if (!user) {
        return new NextResponse("Пользователь не найден", { status: 404 });
    }

    return NextResponse.json(user);
}