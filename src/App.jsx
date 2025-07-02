import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCampuses from "./components/allCampuses";
import AllStudents from "./components/allStudents";
import HomePage from "./components/homePage";
import AddCampus from "./components/AddCampus";
import SingleCampus from "./components/SingleCampus";

const API_URL = "http://localhost:8080";
const App = () => {
  const [campuses, setCampuses] = useState([]);

  async function fetchAllCampuses() {
    try {
      const response = await axios.get(`${API_URL}/api/campuses`);
      setCampuses(response.data);
    } catch (e) {
      console.error("Error fetching campuses: ", e);
    }
  }

  useEffect(() => {
    const sampleCampuses = [
      {
        id: 1,
        name: "BMCC",
        img: "https://bmccprodstroac.blob.core.windows.net/uploads/2024/08/schools.jpg",
        address: "199 Chambers St.",
        description: "Sample Description",
      },
      {
        id: 2,
        name: "Brooklyn College",
        img: "",
        address: "2900 Bedford Avenue",
        description: "Sample Description",
      },
    ];
    setCampuses(sampleCampuses);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="app">
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/campuses"
            element={<AllCampuses campuses={campuses} />}
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
          <Route path="/campuses/:id" element={<SingleCampus />} />
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
