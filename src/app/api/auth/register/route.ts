import { setCookieAction } from "@/app/actions";
import { auth } from "@/lib/auth";
import { ACCESS_TOKEN_KEYWORD } from "@/lib/constants";
import { formatErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  try {
    const { token, user } = await auth.api.signUpEmail({
      body: {
        email,
        password,
        username,
        name: "",
      },
    });

    if (!token) {
      throw new Error("User not found");
    }

    setCookieAction(ACCESS_TOKEN_KEYWORD, token);

    return NextResponse.json(
      {
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: formatErrorMessage(error, "An unexpected error occurred.") },
      { status: 400 },
    );
  }
}
