import "./VoteCard.css";
import { useUser } from "../../providers/UserProvider";

type VoteCardProps = {
  name: string;
};

export function VoteCard({ name }: VoteCardProps) {
  const { currentUser, updateUsersDb } = useUser();

  function handleClick() {
    if (!currentUser) return;

    const updatedUser = { ...currentUser };

    if (currentUser.isVoted) {
      updatedUser.isVoted = !updatedUser.isVoted;
      updatedUser.vote = undefined;
    } else {
      updatedUser.isVoted = !updatedUser.isVoted;
      updatedUser.vote = name;
    }

    updateUsersDb(updatedUser);
  }

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{currentUser?.vote === name ? "1" : "0"}</p>
      <button onClick={handleClick}>
        {currentUser?.isVoted ? "Change Vote" : "Vote"}
      </button>
    </div>
  );
}
