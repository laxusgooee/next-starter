"use client";

import useGetDetails from "@/hooks/queries/useGetDetails";
import { User } from "@/lib/types";
import UserModel from "@/models/user";
import { useUserStore } from "@/store/user";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
  signIn: (user: User) => void;
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

  const signIn = async (user: User) => {
    await setUser(user);
  };

  const signOut = async () => {
    // clear queries
    queryClient.clear();

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
