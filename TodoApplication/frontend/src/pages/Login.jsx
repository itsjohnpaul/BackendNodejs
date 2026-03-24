import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";

function Login({ setPage, setUsername }) {

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState("");

  const login = async () => {
    if (!usernameInput || !password) {
      return setPopup("Enter username & password");
    }

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: usernameInput,
        password
      });

      if (res.data.message === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", usernameInput);

        setUsername(usernameInput);
        setPopup("Login successful ✅");

        setTimeout(() => setPage("todo"), 1000);
      } else {
        setPopup("Invalid login");
      }

    } catch {
      setPopup("Server error");
    }
  };

  return (
    <AuthLayout title="Welcome Back " popup={popup}>

      <input
        className="w-full mb-3 p-3 bg-white/20 text-white rounded-lg placeholder-gray-300 focus:outline-none"
        placeholder="Username"
        onChange={(e) => setUsernameInput(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-4 p-3 bg-white/20 text-white rounded-lg placeholder-gray-300 focus:outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full bg-purple-600 text-white p-3 rounded-lg"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4 text-gray-300">
        Don’t have an account?{" "}
        <span
          onClick={() => setPage("register")}
          className="text-purple-400 cursor-pointer"
        >
          Sign up
        </span>
      </p>

    </AuthLayout>
  );
}

export default Login;