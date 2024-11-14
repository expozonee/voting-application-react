import "./App.css";
import { useEffect } from "react";
import AdminPage from "./components/AdminPage/AdminPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/UserPage/UserPage";
import { useUser } from "./providers/UserProvider";

function App() {
  const { user, isSignedIn, setUser, createUsersDB } = useUser();

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      createUsersDB();
    }
  }, [createUsersDB]);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, [setUser]);

  return (
    <>
      {isSignedIn ? (
        user?.type === "admin" ? (
          <AdminPage />
        ) : (
          <UserPage />
        )
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
