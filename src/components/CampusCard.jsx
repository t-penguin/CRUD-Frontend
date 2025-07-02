import React from "react";
import { useNavigate } from "react-router";
import "./CampusStyle.css";
import axios from "axios";

const CampusCard = ({ campus, API_URL, fetchAllCampuses }) => {
  let navigate = useNavigate();

  const HandleClick = () => {
    navigate(`/campuses/${campus.id}`);
  };

  const HandleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/campuses/${campus.id}`);
      fetchAllCampuses();
    } catch (e) {
      console.error("Error deleting campus", e);
    }
  };

  const HandleEdit = () => {};

  return (
    <div className="campus-card">
      <img className="campus-card-image" src={campus.imageURL}></img>
      <div className="campus-card-text">
        <div className="campus-card-header">
          <h3 onClick={HandleClick} style={{ cursor: "pointer" }}>
            {campus.name}
          </h3>
        </div>
        <p>Address: {campus.address}</p>
      </div>
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

export default CampusCard;
