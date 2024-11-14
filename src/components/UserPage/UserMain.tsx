import "./UserMain.css";
import { useUser } from "../../providers/UserProvider";

export default function UserMain() {
  const { user } = useUser();

  return (
    <div className="main">
      <h1>Welcome {user?.name}</h1>
    </div>
  );
}
