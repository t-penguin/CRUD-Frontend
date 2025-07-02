import React from "react";
import { Link } from "react-router-dom";
import CampusCard from "./CampusCard";

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
      <div className="campuses-header">
        <h2>All Campuses</h2>
        <Link to="/add-campus" className="btn">
          Add Campus
        </Link>
      </div>

      <div className="campus-card-container">
        {campuses.length > 0 ? (
          campuses.map((campus) => (
            <CampusCard key={campus.id} campus={campus}></CampusCard>
          ))
        ) : (
          <p>There are no campuses registered in the database</p>
        )}
      </div>
    </div>
  );
};

export default AllCampuses;
