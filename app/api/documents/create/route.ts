import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3 } from "@/lib/s3";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userID = req.cookies.get("userId")?.value;
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const type = formData.get("documentType") as string;
  const description = formData.get("description") as string;

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type;

  const fileUrl = await uploadFileToS3(buffer, file.name, mimeType);

  if (!file || !title || !userID || !fileUrl || !type || !description) {
    return NextResponse.json(
      { message: "Отсутствует файл, описание или автор" },
      { status: 400 },
    );
  }

  const newDoc = await prisma.document.create({
    data: {
      title,
      description,
      type,
      fileUrl,
      authorId: userID,
      status: "sent",
    },
  });
  return NextResponse.json(
    { message: "Файл успешно создан", file: newDoc },
    { status: 201 },
  );
}
