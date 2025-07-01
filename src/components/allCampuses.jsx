import React, { useEffect, useState } from "react";
import axios from "axios";

const AllCampuses = ({ API_URL }) => {
  const [campuses, setCampuses] = useState([]);

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

  useEffect(() => {
    const sampleCampuses = [
      {
        id: 1,
        name: "BMCC",
        img: "",
        address: "199 Chambers St.",
        description: "Sample Description",
      },
    ];
    setCampuses(sampleCampuses);
  }, []);

  return (
    <div>
      <h2>All Campuses</h2>
      {campuses.length > 0 ? (
        campuses.map((campus) => (
          <div key={campus.id}>
            <h3>{campus.name}</h3>
            <img src="https://bmccprodstroac.blob.core.windows.net/uploads/2024/08/schools.jpg"></img>
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
