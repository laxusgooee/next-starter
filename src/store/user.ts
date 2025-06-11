import { User } from "@/lib/types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IWithClear, IWithHydration } from "./utils";

export interface UserState extends IWithHydration, IWithClear {
  user: User | null;
}

export interface UserActions {
  setUser: (user: User) => void;
}

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

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        setUser: (user) =>
          set((state) => {
            state.user = user;
          }),

        clear: () => set({ user: null }),
      })),
      {
        name: "user-storage",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["_hydrated"].includes(key),
            ),
          ),
        onRehydrateStorage: () => {
          console.log("hydration starts");
          return (state, error) => {
            if (error) {
              console.log("an error happened during hydration", error);
            } else {
              if (state) {
                state._hydrated = true;
              }

              console.log("hydration finished");
            }
          };
        },
      },
    ),
  ),
);
