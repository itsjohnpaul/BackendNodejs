import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";

function Register({ setPage }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const register = async () => {

    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!username) {
      setEmailError("Email required");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password required");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:3000/register", {
        username,
        password
      });

      if (res.data.message === "username already exists") {
        setPopup("Email already exists ❌");
      } else {
        setPopup("Registered successfully ✅");
        setTimeout(() => setPage("login"), 1000);
      }

    } catch {
      setPopup("Server error");
    }
  };

  return (
    <AuthLayout title="Create Account " popup={popup}>

      <input
        className="w-full mb-1 p-3 bg-white/20 text-white rounded-lg placeholder-gray-300"
        placeholder="Email"
        onChange={(e) => setUsername(e.target.value)}
      />
      {emailError && <p className="text-red-400 text-sm mb-2">{emailError}</p>}

      <input
        type="password"
        className="w-full mb-1 p-3 bg-white/20 text-white rounded-lg placeholder-gray-300"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <p className="text-red-400 text-sm mb-2">{passwordError}</p>}

      <button
        onClick={register}
        className="w-full bg-purple-600 text-white p-3 rounded-lg mt-2"
      >
        Register
      </button>

      <p className="text-sm text-center mt-4 text-gray-300">
        Already have an account?{" "}
        <span
          onClick={() => setPage("login")}
          className="text-purple-400 cursor-pointer"
        >
          Login
        </span>
      </p>

    </AuthLayout>
  );
}

export default Register;