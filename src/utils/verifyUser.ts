import USERS from "../data/users.json";

// types
import type { User } from "../types/User";

export function verifyUser(username: string, password: string) {
  const users: User[] = USERS;

  const user = users.find((user) => {
    return user.name === username;
  });

  if (!user)
    return {
      status: "User is not found",
      ok: false,
    };

  if (user.password === password) {
    return {
      status: "valid",
      ok: true,
      user,
    };
  } else {
    return {
      status: "Password is incorrect",
      ok: false,
    };
  }
}
