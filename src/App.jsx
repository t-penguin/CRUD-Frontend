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
import SingCampus from "./components/singleCampus";
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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/students/:id" element={<SingStudent />} />
        <Route path="/campuses" element={<AllCampuses />} />
        <Route path="/campuses/:id" element={<SingCampus />} />
        <Route path="/add-campus" element={<AddCampus />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
