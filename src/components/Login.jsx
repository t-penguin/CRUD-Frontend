import React, { useState } from "react";
import axios from "axios";
import "./Login.css"
import { useNavigate } from "react-router";


const LoginPage = ({ API_URL, setLoggedIn }) => {
  const navigate = useNavigate();

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
      }, { withCredentials: true }); 

      console.log(res.data);
      alert("Login Successful!");
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form id="loginForm" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="btn-container">
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
