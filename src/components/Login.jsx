import React, { useEffect } from "react";
import "./Login.css";

const LoginPage = () => {
  useEffect(() => {
    const togglePassword = document.querySelector(".toggle-password");
    const passwordField = document.getElementById("password");

    if (togglePassword && passwordField) {
      togglePassword.addEventListener("click", () => {
        passwordField.type =
          passwordField.type === "password" ? "text" : "password";
      });
    }

    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
          e.preventDefault();
          alert("Please fill in all fields!");
          return;
        }

        document.getElementById("progress-bar").style.width = "100%";

        setTimeout(() => {
          alert("Login Successful!");
        }, 2000);
      });
    }
  }, []);

};
export default LoginPage;
