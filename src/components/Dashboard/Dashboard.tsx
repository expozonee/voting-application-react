import { VoteContainer } from "../VoteContainer/VoteContainer";
import "./Dashboard.css";
import { useUser } from "../../providers/UserProvider";
import AdminPage from "../AdminPage/AdminPage";

type DashboardProps = {
  page: string;
};

export default function Dashboard({ page }: DashboardProps) {
  const { isAdmin } = useUser();

  return (
    <div className="main">
      {page === "vote" ? <VoteContainer /> : isAdmin ? <AdminPage /> : null}
    </div>
  );
}
