// types
import type { User } from "../types/User";

export function verifyUser(username: string, password: string) {
  let users;

  const usersString = localStorage.getItem("users");

  if (usersString) {
    users = JSON.parse(usersString) as User[];
  }

  if (!users)
    return {
      status: "Db does not exist",
      ok: false,
    };

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
