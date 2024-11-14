import "./App.css";
import { useEffect } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/Dashboard/UserPage";
import { useUser } from "./providers/UserProvider";

function App() {
  const { isSignedIn, createUsersDB, setCurrentUser } = useUser();

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      createUsersDB();
    }
  }, [createUsersDB]);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");

    if (userString) {
      setCurrentUser(JSON.parse(userString));
    }
  }, [setCurrentUser]);

  return <>{isSignedIn ? <UserPage /> : <LoginPage />}</>;
}

export default App;
