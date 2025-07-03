import React, { useEffect, useState } from "react";
import "./CampusStyle.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const SingleCampus = ({ API_URL, fetchAllCampuses }) => {
  //const [isEditing, setIsEditing] = useState(false);
  let navigate = useNavigate();

  const { id } = useParams();
  const [campus, setCampus] = useState("");

  const HandleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/campuses/${campus.id}`
      );
      console.log("Deleting", response.data);
      fetchAllCampuses();
      navigate("/campuses");
    } catch (e) {
      console.error("Error deleting campus", e);
    }
  };

  const HandleEdit = async () => {
    /*
    try {
      const response = await axios.patch(
        `${API_URL}/api/campuses/${campus.id}`
      );
      console.log("Modifying", response.data);
    } catch (e) {
      console.error("Error editing campus", e);
    }
      */
  };

  useEffect(() => {
    async function fetchCampus() {
      try {
        const response = await axios.get(`${API_URL}/api/campuses/${id}`);
        console.log("Campus response:", response.data.campus);
        setCampus(response.data.campus);
      } catch (e) {
        console.error("Failed to fetch campus", e);
      }
    }

    fetchCampus();
  }, []);

  if (!campus) return <p>Campus not found</p>;

  return (
    <div className="single-campus-card">
      <div className="single-campus-card-header">
        <h2>{campus.name}</h2>
      </div>
      <img className="campus-card-image" src={campus.imageURL}></img>
      <p>Description: {campus.description}</p>
      <p>Address: {campus.address}</p>
      <div className="btns">
        <button className="btn-edit" onClick={HandleEdit}>
          Edit
        </button>
        <button className="btn-delete" onClick={HandleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleCampus;
