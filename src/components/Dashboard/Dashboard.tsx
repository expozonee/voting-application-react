import "./Dashboard.css";
import AdminPage from "../AdminPage/AdminPage";
import { useUser } from "../../providers/UserProvider";
import { VoteContainer } from "../VoteContainer/VoteContainer";

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
