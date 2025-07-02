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
      await axios.post(`${API_URL}/api/tasks`, {
        name,
        description,
        address,
        image,
      });

      fetchAllCampuses();
    } catch (e) {
      console.error("Error adding campus", e);
    }

    navigate("/");
  };

  return (
    <div>
      <h1>Add a Campus</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image Link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCampus;
