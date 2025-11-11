"use client";

import useGetDetails from "@/hooks/queries/use-get-details";
import { User } from "@/lib/types";
import UserModel from "@/providers/AuthProvider/models/user";
import { useUserStore } from "@/store/user";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import LoginPopup from "./components/login-popup";

interface AuthContextType {
  gaurd: (
    callback: (args?: any) => void,
    opts?: {
      checkVerification?: boolean;
    },
  ) => void;
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
  gaurd: () => null,
});

export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { _hydrated, user, setUser, clear: clearUser } = useUserStore();

  const [openAuthModal, setOpenAuthModal] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDetailsQuery.data?.data]);

  const signIn = async (user: User) => {
    setUser(user);
  };

  const signOut = async () => {
    // clear queries
    queryClient.clear();

    // clear stores

    clearUser();
  };

  const guard: AuthContextType["gaurd"] = (callback) => {
    if (!user) {
      return setOpenAuthModal(true);
    }

    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ? UserModel.fromJson(user) : null,
        isLoading: !_hydrated,
        gaurd: guard,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}

      {openAuthModal && <LoginPopup onOpenChange={setOpenAuthModal} />}
    </AuthContext.Provider>
  );
}
