import "./VoteCard.css";
import { useUser } from "../../providers/UserProvider";

type VoteCardProps = {
  name: string;
  imageUrl: string;
};

export function VoteCard({ name, imageUrl }: VoteCardProps) {
  const { currentUser, votesCount, updateUsersDb } = useUser();

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
      <img
        src={imageUrl}
        alt={name}
        style={{ width: "100%", height: "60%", objectFit: "contain" }}
      />
      <h3>{name}</h3>
      <p>Vote: {votesCount[name] ?? 0}</p>
      <button onClick={handleClick}>
        {currentUser?.isVoted ? "Change Vote" : "Vote"}
      </button>
      {currentUser!.vote === name && <p className="my-vote">My vote</p>}
    </div>
  );
}
