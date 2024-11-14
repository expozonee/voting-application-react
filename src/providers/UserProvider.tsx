import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";
import { verifyUser } from "../utils/verifyUser";
import { getUsers } from "../utils/getUsers";
import USERS from "../data/users.json";

type UserProviderProps = {
  children: ReactNode;
};

type UserContext = {
  isSignedIn: boolean;
  isAdmin: boolean;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  getUsers(): User[] | undefined;
  createUsersDB(): void;
  login(
    username: string,
    password: string
  ): {
    ok: boolean;
    status: string;
  };
  logout(): void;
  updateUsersDb(user: User): void;
};

const UserContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const isSignedIn = !!currentUser;
  const isAdmin = isSignedIn && currentUser.type === "admin";

  function login(username: string, password: string) {
    const { user, ok, status } = verifyUser(username, password);

    if (ok) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    }

    return { ok, status };
  }

  function logout() {
    setCurrentUser(undefined);
    localStorage.removeItem("currentUser");
  }

  function createUsersDB() {
    const usersDb = USERS.map((user) => {
      return {
        ...user,
        isVoted: false,
        vote: undefined,
      };
    }) as User[];

    localStorage.setItem("users", JSON.stringify(usersDb));
  }

  function updateUsersDb(user: User) {
    const users = getUsers();

    if (users) {
      const updatedUsers = [...users.filter((u) => u.name !== user.name), user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")!) as User);
    }
  }

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        isAdmin,
        currentUser,
        setCurrentUser,
        login,
        logout,
        getUsers,
        createUsersDB,
        updateUsersDb,
      }}
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
