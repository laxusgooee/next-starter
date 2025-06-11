import { setCookieAction } from "@/app/actions";
import {
  ACCESS_TOKEN_KEYWORD,
  API_URL,
  REFRESH_TOKEN_KEYWORD,
} from "@/lib/constants";
import { formatErrorMessage } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password, provider } = await request.json();

  try {
    const res = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
        provider,
      },
      { headers: { "Content-Type": "application/json" } },
    );

    // TODO: handle errors

    const { token, refresh_token } = res.data;

    setCookieAction(ACCESS_TOKEN_KEYWORD, token);

    if (refresh_token) {
      setCookieAction(REFRESH_TOKEN_KEYWORD, refresh_token);
    }

    return NextResponse.json(
      {
        token,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: formatErrorMessage(error, "An unexpected error occurred.") },
      { status: 500 },
    );
  }
}
