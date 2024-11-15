import "./Header.css";
import { useState } from "react";
import { useUser } from "../../providers/UserProvider";

type HeaderProps = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

export function Header({ setPage }: HeaderProps) {
  const { currentUser, isAdmin, logout } = useUser();
  const [isMenuShown, setIsMenuShown] = useState(false);

  function handleClick() {
    setIsMenuShown(!isMenuShown);
  }

  return (
    <header className="header">
      <div className="logo">Monsters</div>
      <button onClick={handleClick} className="logout-button">
        {currentUser?.name}
      </button>

      {isMenuShown && (
        <ul className="user-menu">
          {isAdmin && (
            <li key="vote">
              <button
                onClick={() => {
                  setPage("vote");
                  setIsMenuShown(false);
                }}
              >
                Vote
              </button>
            </li>
          )}
          {isAdmin && (
            <li key="admin">
              <button
                onClick={() => {
                  setPage("admin");
                  setIsMenuShown(false);
                }}
              >
                Admin
              </button>
            </li>
          )}
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
    </header>
  );
}
