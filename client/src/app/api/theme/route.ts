import { NextResponse } from "next/server";

export async function POST(re: Request) {
  const { theme } = await re.json();

  const res = NextResponse.json({ success: true });
  res.cookies.set("theme", theme, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
