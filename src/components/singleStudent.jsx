import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentStyles.css";

const API_URL = "https://crud-backend-black-kappa.vercel.app";

const SingleStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    imageUrl: "",
    campusId: ""
  });
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students/${studentId}`);
        setStudent(response.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    const fetchCampuses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/campuses`);
        setCampuses(response.data);
      } catch (err) {
        console.error("Error fetching campuses:", err);
      }
    };

    fetchStudent();
    fetchCampuses();
  }, [studentId]);

  useEffect(() => {
    if (isEditing && student) {
      const filledForm = {
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        gpa: student.gpa?.toString() || "",
        imageUrl: student.imageUrl || "",
        campusId: student.campusId || ""
      };
      setFormData(filledForm);
      console.log("Prefilled student data:", filledForm);
    }
  }, [isEditing, student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/students/${studentId}`, formData);
      const updatedStudent = { ...student, ...formData };
      setStudent(updatedStudent);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/students/${studentId}`);
      navigate("/students");
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!student) return <p>Loading student...</p>;

  return (
    <div className="card">
      <img
        src={student.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
        alt="Student Avatar"
      />

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />

          <label>Last Name:</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />

          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />

          <label>GPA:</label>
          <input name="gpa" value={formData.gpa} onChange={handleChange} />

          <label>Image URL:</label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

          <label>Campus:</label>
          <select name="campusId" value={formData.campusId} onChange={handleChange}>
            <option value="">-- None --</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-edit">💾 Save</button>
          <button type="button" onClick={handleCancel} className="btn">Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{student.firstName} {student.lastName}</h2>
          <p><strong>Email:</strong> {student.email || "N/A"}</p>
          <p><strong>GPA:</strong> {student.gpa ?? "N/A"}</p>
          <p>
            {student.campus ? (
              <>
                <strong>Campus:</strong>{" "}
                <a href={`/campuses/${student.campus.id}`}>{student.campus.name}</a>
              </>
            ) : (
              <em>This student is not registered to a campus.</em>
            )}
          </p>
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
