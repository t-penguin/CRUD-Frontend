import React from "react";
import { useNavigate } from "react-router";
import "./CampusStyle.css";

const CampusCard = ({ campus }) => {
  let navigate = useNavigate();

  const HandleClick = () => {
    navigate(`/campuses/${campus.id}`);
  };

  return (
    <div className="campus-card">
      <img className="campus-card-image" src={campus.img}></img>

      <div className="campus-card-text">
        <div className="campus-card-header">
          <h3 onClick={HandleClick} style={{ cursor: "pointer" }}>
            {campus.name}
          </h3>
        </div>
        <p>Address: {campus.address}</p>
      </div>
    </div>
  );
};

export default CampusCard;
