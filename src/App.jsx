import React from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCampuses from "./components/allCampuses";
import AllStudents from "./components/allStudents";
import HomePage from "./components/homePage";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="app">
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/students" element={<AllStudents />} />
        </Routes>
      </div>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
