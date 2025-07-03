import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AddCampus = ({ fetchAllCampuses, API_URL }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${API_URL}/api/campuses`, {
        name,
        description,
        address,
        image,
      });

      fetchAllCampuses();
    } catch (e) {
      console.error("Error adding campus", e);
    }

    navigate("/campuses");
  };

  return (
    <div>
      <h1>Add a Campus</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Image Link</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCampus;
