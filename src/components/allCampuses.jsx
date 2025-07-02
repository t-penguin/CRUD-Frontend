import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCampus from "./AddCampus";
import { Link } from "react-router-dom";

const AllCampuses = ({ campuses }) => {
  /*
  async function fetchAllCampuses() {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setCampuses(response.data);
    } catch (e) {
      console.error("Error fetching campuses:", e);
    }
  }
  */

  return (
    <div>
      <h2>All Campuses</h2>
      <Link to="/add-campus" className="btn">
        Add Campus
      </Link>

      {campuses.length > 0 ? (
        campuses.map((campus) => (
          <div key={campus.id}>
            <h3>{campus.name}</h3>
            <img src={campus.img}></img>
            <p>Address: {campus.address}</p>
            <p>Description: {campus.description}</p>
          </div>
        ))
      ) : (
        <p>No campuses available</p>
      )}
    </div>
  );
};

export default AllCampuses;
