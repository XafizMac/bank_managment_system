import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const docs = await prisma.document.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      fileUrl: true,
      status: true,
      author: true,
      createdAt: true,
    },
  });

  if (!docs.length) {
    return NextResponse.json(
      { message: "Документы не найдены" },
      { status: 404 },
    );
  }

  return NextResponse.json({ docs }, { status: 200 });
}
