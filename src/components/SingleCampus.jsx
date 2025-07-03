import React, { useEffect, useState } from "react";
import "./CampusStyle.css";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router";

const SingleCampus = ({ API_URL, fetchAllCampuses }) => {
  const location = useLocation();
  const isEditingFromAllCampus = location.state?.isEditing === true;
  const [isEditing, setIsEditing] = useState(isEditingFromAllCampus);
  const [students, setStudents] = useState([]);
  let navigate = useNavigate();

  const { id } = useParams();

  const [campus, setCampus] = useState({
    name: "",
    address: "",
    description: "",
    imageURL: "",
  });
  const [formData, setFormData] = useState({
    campus: {
      name: "",
      address: "",
      description: "",
      imageURL: "",
    },
  });
  const [error, setError] = useState("");

  const handleDelete = async () => {
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

  const handleSave = async () => {
    if (
      !formData.campus?.name &&
      !formData.campus?.description &&
      !formData.campus?.address &&
      !formData.campus?.imageURL
    ) {
      setError("At least one field is required.");
      return;
    }

    setCampus(formData.campus);

    try {
      const response = await axios.put(
        `${API_URL}/api/campuses/${campus.id}`,
        formData.campus
      );
      console.log("Modifying status:", response.data);
      setIsEditing(false);
    } catch (e) {
      console.error(`Failed to modify ${campus.id}`, e);
    }
  };

  useEffect(() => {
    async function fetchCampus() {
      try {
        const response = await axios.get(`${API_URL}/api/campuses/${id}`);
        console.log("Campus response:", response.data.campus);
        console.log("Students response:", response.data.students);
        setCampus(response.data.campus);
        setStudents(response.data.students);
      } catch (e) {
        console.error("Failed to fetch campus", e);
      }
    }

    fetchCampus();
  }, []);

  useEffect(() => {
    setFormData({ campus });
  }, [campus]);

  if (!campus) return <p>Campus not found</p>;
  return (
    <div className="single-campus-card">
      <div className="single-campus-card-header">
        <h2>{campus.name}</h2>
      </div>
      <img className="campus-card-image" src={campus.imageURL}></img>
      <p>Description: {campus.description}</p>
      <p>Address: {campus.address}</p>

      <div className="student-list">
        <p>Students:</p>
        {students.map((student) => (
          <div key={student?.id}>{student?.firstName}</div>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      {isEditing ? (
        <div>
          <label>Name</label>
          <input
            value={formData.campus?.name || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                campus: {
                  ...formData.campus,
                  name: e.target.value,
                },
              })
            }
          />
          <label>Address</label>
          <input
            value={formData.campus?.address || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                campus: { ...formData.campus, address: e.target.value },
              })
            }
          />

          <label>Description</label>
          <input
            value={formData.campus?.description || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                campus: { ...formData.campus, description: e.target.value },
              })
            }
          />
          <label>Image URL</label>
          <input
            value={formData.campus?.imageURL || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                campus: { ...formData.campus, imageURL: e.target.value },
              })
            }
          />
          <button onClick={handleSave} className="btn-edit">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="btn">
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} className="btn-edit">
          Edit
        </button>
      )}

      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default SingleCampus;
