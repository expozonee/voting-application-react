import { User } from "../types/User";

export type VotesCount = {
  [name: string]: number;
};

export function updateVotesCount() {
  const users = JSON.parse(localStorage.getItem("users")!) as User[];

  const votesCount = users.reduce((acc: VotesCount, user) => {
    if (user.vote) {
      if (!acc[user.vote]) {
        acc[user.vote] = 1;
      } else {
        acc[user.vote]++;
      }
    }
    return acc;
  }, {});

  return votesCount;
}
