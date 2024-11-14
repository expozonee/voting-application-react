import { useState } from "react";
import { Header } from "../UI/Header";
import Dashboard from "./Dashboard";

export default function UserPage() {
  const [page, setPage] = useState("vote");

  return (
    <div>
      <Header setPage={setPage} />
      <Dashboard page={page} />
    </div>
  );
}
