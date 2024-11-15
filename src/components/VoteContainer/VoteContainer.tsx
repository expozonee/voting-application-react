import "./VoteContainer.css";
import { VoteCard } from "../VoteCard/VoteCard";
import candidates from "../../data/candidates.json";

export function VoteContainer() {
  return (
    <div className="vote-container">
      {candidates.map((c) => {
        return <VoteCard key={c.id} name={c.name} imageUrl={c.imageUrl} />;
      })}
    </div>
  );
}
