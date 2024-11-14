import "./VoteContainer.css";

import { VoteCard } from "../VoteCard/VoteCard";

const candidates = [
  { id: 1, name: "Candidate 1" },
  { id: 2, name: "Candidate 2" },
  { id: 3, name: "Candidate 3" },
  { id: 4, name: "Candidate 4" },
];

export function VoteContainer() {
  return (
    <div className="vote-container">
      {candidates.map((c) => {
        return <VoteCard key={c.id} name={c.name} />;
      })}
    </div>
  );
}
