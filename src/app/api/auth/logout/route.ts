import { deleteCookieAction } from "@/app/actions";
import { ACCESS_TOKEN_KEYWORD, REFRESH_TOKEN_KEYWORD } from "@/lib/constants";
import { formatErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    deleteCookieAction(ACCESS_TOKEN_KEYWORD);
    deleteCookieAction(REFRESH_TOKEN_KEYWORD);

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: formatErrorMessage(error, "An unexpected error occurred.") },
      { status: 500 },
    );
  }
}
