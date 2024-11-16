import "./App.css";
import { useEffect } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/Dashboard/UserPage";
import { useUser } from "./providers/UserProvider";
import { updateVotesCount } from "./utils/updateVotes";

function App() {
  const { isSignedIn, createUsersDB, setCurrentUser, setVotesCount } =
    useUser();

    if (!localStorage.getItem("users")) {
      createUsersDB();

    }

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      createUsersDB();

    }
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");

    if (userString) {
      setCurrentUser(JSON.parse(userString));
    }
  }, [setCurrentUser]);

  /* useEffect(() => {
    setVotesCount(updateVotesCount());
  }, [setVotesCount]);*/

  return <>{isSignedIn ? <UserPage /> : <LoginPage />}</>;
}

export default App;
