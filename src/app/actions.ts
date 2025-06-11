"use server";

import { getCookie, setCookie } from "cookies-next/server";
import { cookies } from "next/headers";

export async function setCookieAction(k: string, v: string) {
  return await setCookie(k, v, {
    cookies,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function getCookieAction(k: string) {
  return await getCookie(k, {
    cookies,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}
