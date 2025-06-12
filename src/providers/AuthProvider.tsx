"use client";

import { deleteCookieAction, setCookieAction } from "@/app/actions";
import useGetDetails from "@/hooks/queries/useGetDetails";
import { ACCESS_TOKEN_KEYWORD } from "@/lib/constants";
import { User } from "@/lib/types";
import UserModel from "@/models/user";
import { useUserStore } from "@/store/user";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
  signIn: (accessToken: string) => void;
  signOut: () => void;
  isLoading: boolean;
  user: UserModel | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: () => null,
  signOut: () => null,
});

export function decodeUser(token: string): Partial<User> | undefined {
  const { sub, username, first_name, last_name, email } = jwtDecode<
    JwtPayload & Omit<User, "id">
  >(token);

  return {
    id: sub as string,
    username,
    email,
    first_name,
    last_name,
  };
}

export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { _hydrated, user, setUser, clear: clearUser } = useUserStore();

  const getDetailsQuery = useGetDetails({
    enabled: !!user && _hydrated,
  });

  useEffect(() => {
    if (getDetailsQuery.data?.data) {
      setUser({
        ...user,
        ...getDetailsQuery.data.data,
      });
    }
  }, [getDetailsQuery.data?.data]);

  const signIn = async (accessToken: string) => {
    const user = decodeUser(accessToken);

    if (!user) {
      throw new Error("Invalid user");
    }

    await setCookieAction(ACCESS_TOKEN_KEYWORD, accessToken);

    await setUser(user as User);
  };

  const signOut = async () => {
    // clear queries
    queryClient.clear();

    deleteCookieAction(ACCESS_TOKEN_KEYWORD);

    clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ? UserModel.fromJson(user) : null,
        isLoading: !_hydrated,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
