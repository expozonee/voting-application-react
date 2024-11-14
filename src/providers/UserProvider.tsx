import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";
import { verifyUser } from "../utils/verifyUser";

type UserProviderProps = {
  children: ReactNode;
};

type UserContext = {
  isSignedIn: boolean;
  isAdmin: boolean;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  login(
    username: string,
    password: string
  ): {
    ok: boolean;
    status: string;
  };
  logout(): void;
};

const UserContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const isSignedIn = !!user;
  const isAdmin = isSignedIn && user.type === "admin";

  function login(username: string, password: string) {
    const { user, ok, status } = verifyUser(username, password);

    if (ok) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return { ok, status };
  }

  function logout() {
    setUser(undefined);
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider
      value={{ isSignedIn, isAdmin, user, setUser, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const userContext = useContext(UserContext);

  if (userContext === null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return userContext;
}
