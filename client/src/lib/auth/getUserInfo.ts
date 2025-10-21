"use server";

import { cookies } from "next/headers";

export async function getUserInfo() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) {
    console.log("로그인 토큰 없음");
    return null;
  }

  console.log("발급된 토큰", token);
  return { token };
}
