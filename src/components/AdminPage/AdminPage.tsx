import "./AdminPage.css";
import { useUser } from "../../providers/UserProvider";
import { Chart } from "../Chart/Chart";

export default function AdminPage() {
  const { getUsers } = useUser();

  const users = getUsers();

  if (!users) return;

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <div className="table-container">
        <div className="table-header">
          <h4>Name</h4>
          <h4>Status</h4>
        </div>
        <table className="admin-table">
          <tbody>
            {users.map((u) => (
              <tr key={u.name} className={`${u.isVoted ? "voted" : ""}`}>
                <td>{u.name}</td>
                <td>{u.isVoted ? "Voted!" : "Did Not Vote"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Chart />
    </div>
  );
}
