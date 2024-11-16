import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";
import { verifyUser } from "../utils/verifyUser";
import { getUsers } from "../utils/getUsers";
import USERS from "../data/users.json";
import candidates from "../data/candidates.json";
import { updateVotesCount, VotesCount } from "../utils/updateVotes";
import { BubbleDataPoint, ChartData, Point } from "chart.js";

type UserProviderProps = {
  children: ReactNode;
};

type UserContext = {
  isSignedIn: boolean;
  isAdmin: boolean;
  currentUser: User | undefined;
  votesCount: VotesCount;
  chartData: ChartData<
    "bar",
    (number | [number, number] | Point | BubbleDataPoint | null)[],
    unknown
  >;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setVotesCount: React.Dispatch<React.SetStateAction<VotesCount>>;
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
  // new

  if (localStorage.getItem("users") === null) {
    createUsersDB();
  }

  // finish new
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [votesCount, setVotesCount] = useState<VotesCount>({});
  const [chartData, setChartData] = useState<
    ChartData<
      "bar",
      (number | [number, number] | Point | BubbleDataPoint | null)[],
      unknown
    >
  >({
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "# of Votes",
        data: candidates.map((c) => updateVotesCount()[c.name]),
        borderWidth: 1,
      },
    ],
  });
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

    const userIndex = users!.findIndex((u) => u.name === user.name);
    const updatedUsers = [...users!.filter((u) => u.name !== user.name)];

    if (users) {
      const updatedArrUsers = [
        ...updatedUsers.slice(0, userIndex),
        user,
        ...updatedUsers.slice(userIndex),
      ];
      localStorage.setItem("users", JSON.stringify(updatedArrUsers));
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")!) as User);
      setVotesCount(updateVotesCount());
      setChartData({
        labels: candidates.map((c) => c.name),
        datasets: [
          {
            label: "# of Votes",
            data: candidates.map((c) => updateVotesCount()[c.name]),
            borderWidth: 1,
          },
        ],
      });
    }
  }

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        isAdmin,
        currentUser,
        votesCount,
        chartData,
        setCurrentUser,
        setVotesCount,
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
