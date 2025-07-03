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
import SingleStudent from "./components/singleStudent";

const API_URL = "https://crud-backend-black-kappa.vercel.app";

const App = () => {
  const [campuses, setCampuses] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchAllCampuses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/campuses`);
      setCampuses(response.data);
    } catch (e) {
      console.error("Error fetching campuses:", e);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/students`);
      setStudents(response.data);
    } catch (e) {
      console.error("Error fetching students:", e);
    }
  };

  useEffect(() => {
    fetchAllCampuses();
    fetchAllStudents();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<AllStudents students={students} />} />
        <Route path="/students/:studentId" element={<SingleStudent />} />
        <Route path="/campuses" element={
          <AllCampuses 
            campuses={campuses} 
            API_URL={API_URL} 
            fetchAllCampuses={fetchAllCampuses} 
          />
        } />
        <Route path="/campuses/:id" element={
          <SingleCampus 
            API_URL={API_URL} 
            fetchAllCampuses={fetchAllCampuses} 
          />
        } />
        <Route path="/add-campus" element={
          <AddCampus 
            API_URL={API_URL} 
            fetchAllCampuses={fetchAllCampuses} 
          />
        } />
        <Route path="/add-student" element={
          <AddStudent 
            students={students} 
            setStudents={setStudents} 
            fetchAllStudents={fetchAllStudents} 
          />
        } />

        {/* Fallback Route */}
        <Route path="*" element={<p style={{ padding: "1rem" }}>404: Page Not Found</p>} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
