import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";

function App() {
  const [page, setPage] = useState("login");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  if (page === "login") {
    return <Login setPage={setPage} setUserId={setUserId} setUsername={setUsername} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  return <Todo userId={userId} username={username} setPage={setPage} />;
}

export default App;