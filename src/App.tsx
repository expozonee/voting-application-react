import "./App.css";
import { useEffect } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/Dashboard/UserPage";
import { useUser } from "./providers/UserProvider";
import { updateVotesCount } from "./utils/updateVotes";

function App() {
  const { isSignedIn, setCurrentUser, setVotesCount } = useUser();

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    setVotesCount(updateVotesCount());

    if (userString) {
      setCurrentUser(JSON.parse(userString));
    }
  }, [setCurrentUser, setVotesCount]);

  return <>{isSignedIn ? <UserPage /> : <LoginPage />}</>;
}

export default App;
