import React, { useState } from "react";
import "./CampusStyle.css";

const SingleCampus = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="SingleCampus">
      isEditing ? (console.log("Is editing")) : (console.log("Is not editing"));
    </div>
  );
};

export default SingleCampus;
