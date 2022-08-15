import { createContext, useState } from "react";
import { User } from "../Interfaces";
import { useLocalStorage } from "./useStorage";

const AuthContext = createContext<
  [User | undefined, React.Dispatch<React.SetStateAction<User | undefined>>]
>([undefined, () => {}]);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | undefined>("user", undefined);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
