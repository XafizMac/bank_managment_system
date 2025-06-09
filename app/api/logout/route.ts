import { useStore } from "@/store/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Вы вышли из системы" });

  response.cookies.delete("userId");
  response.cookies.delete("userRole");

  useStore.getState().clearUser();
  useStore.getState().setAuthenticated(false);

  return response;
}
