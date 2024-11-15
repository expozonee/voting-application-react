export type User = {
  name: string;
  password: string;
  type: string;
  email: string;
  isVoted: boolean;
  vote: string | undefined;
};
