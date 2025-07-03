import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./AppStyles.css";
import Navbar from "./components/NavBar";
import AllCampuses from "./components/allCampuses";
import AllStudents from "./components/allStudents";
import HomePage from "./components/homePage";
import AddCampus from "./components/AddCampus";
import SingleCampus from "./components/SingleCampus";
import AddStudent from "./components/addStudent";
import SingStudent from "./components/singleStudent";

const API_URL = "https://crud-backend-black-kappa.vercel.app";

const App = () => {
  const [campuses, setCampuses] = useState([]);

  async function fetchAllCampuses() {
    try {
      const response = await axios.get(`${API_URL}/api/campuses`);
      setCampuses(response.data);
    } catch (e) {
      console.error("Error fetching campuses:", e);
    }
  }

  useEffect(() => {
    fetchAllCampuses();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="app">
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/campuses"
            element={
              <AllCampuses
                campuses={campuses}
                API_URL={API_URL}
                fetchAllCampuses={fetchAllCampuses}
              />
            }
          />
          <Route path="/students" element={<AllStudents />} />
          <Route
            path="/add-campus"
            element={
              <AddCampus
                fetchAllCampuses={fetchAllCampuses}
                API_URL={API_URL}
              />
            }
          />
          <Route
            path="/campuses/:id"
            element={
              <SingleCampus
                API_URL={API_URL}
                fetchAllCampuses={fetchAllCampuses}
              />
            }
          />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students/:id" element={<SingStudent />} />
        </Routes>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);
