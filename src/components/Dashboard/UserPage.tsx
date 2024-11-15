import "./UserPage.css";
import { useState } from "react";
import { Header } from "../UI/Header";
import Dashboard from "./Dashboard";

export default function UserPage() {
  const [page, setPage] = useState("vote");

  return (
    <div className="user-page">
      <Header setPage={setPage} />
      <Dashboard page={page} />
    </div>
  );
}
