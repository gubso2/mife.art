import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin password not configured. Set ADMIN_PASSWORD in Vercel environment variables." },
      { status: 500 }
    );
  }

  if (password.trim() !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = Buffer.from(`${Date.now()}-${process.env.ADMIN_PASSWORD}`).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return NextResponse.json({ success: true });
}
