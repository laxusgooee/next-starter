"use client";

import { Button } from "@/components/ui";
import { ACCESS_TOKEN_KEYWORD } from "@/lib/constants";
import { useAuthSession } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { getCookieAction } from "./actions";

export default function Home() {
  const router = useRouter();

  const { user, signOut } = useAuthSession();

  if (!user) {
    // console.log(getCookieAction());
  }

  const displayCookie = async () =>
    alert(await getCookieAction(ACCESS_TOKEN_KEYWORD));

  const goToLogin = async () => {
    signOut();

    router.replace("/auth/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-2xl border border-neutral-950 p-4 w-full max-w-lg">
        <h5>Hello {user?.name}</h5>

        <div className="my-4">
          <hr />
        </div>

        <div className="flex flex-row justify-end gap-3">
          <Button onClick={displayCookie}>Display cookie</Button>
          <Button onClick={goToLogin}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
