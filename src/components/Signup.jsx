import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email } = formData;

    if (!username || !password || !email) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/students", formData);
      alert("Sign Up Successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Sign Up Failed. Try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="wrapper">
        <form className="signupForm" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          {[
            { name: "username", placeholder: "username", required: true },
            { name: "password", placeholder: "password", required: true },
            {
              name: "email",
              placeholder: "Email",
              type: "email",
              required: true,
            },
          ].map(({ name, placeholder, type = "text", ...rest }) => (
            <div className="input-box" key={name}>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                {...rest}
              />
            </div>
          ))}

          <div className="btn-container">
            <button className="btn" type="submit">
              Sign Up
            </button>
          </div>

          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
