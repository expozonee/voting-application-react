import { User } from "../types/User";

export function getUsers() {
  let users;

  if (localStorage.getItem("users")) {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      users = JSON.parse(usersString) as User[];
    }
  }

  if (!users) return;

  return users;
}
