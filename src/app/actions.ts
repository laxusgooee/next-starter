"use server";

import { deleteCookie, getCookie, setCookie } from "cookies-next/server";
import { cookies } from "next/headers";

const config = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

export async function setCookieAction(
  k: string,
  v: string,
  _opts?: Record<string, unknown>,
) {
  return await setCookie(k, v, {
    cookies,
    ...config,
  });
}

export async function getCookieAction(
  k: string,
  _opts?: Record<string, unknown>,
) {
  return await getCookie(k, {
    cookies,
    ...config,
  });
}

export async function deleteCookieAction(
  k: string,
  _opts?: Record<string, unknown>,
) {
  return await deleteCookie(k, {
    cookies,
    ...config,
  });
}
