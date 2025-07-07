import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const LoginPage = ({ API_URL }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      }, { withCredentials: true }); // <- important if using cookies

      console.log(res.data);
      alert("Login Successful!");
      // Optionally: redirect or set app state
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };
export default LoginPage;
