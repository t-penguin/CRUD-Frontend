import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleStudent = ({ students, setStudents }) => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === parseInt(studentId));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student || {});
  const [error, setError] = useState("");
  const [selectedCampusId, setSelectedCampusId] = useState("");
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    axios.get("/api/campuses").then(res => setCampuses(res.data));
  }, []);

  if (!student) return <p>Student not found.</p>;

  const handleDelete = () => {
    const updated = students.filter((s) => s.id !== student.id);
    setStudents(updated);
    navigate("/students");
  };

  const handleSave = async () => {
  if (!formData.firstName || !formData.lastName || !formData.email) {
    setError("All fields are required.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  const gpa = parseFloat(formData.gpa);
  if (isNaN(gpa) || gpa < 0.0 || gpa > 4.0) {
    setError("GPA must be between 0.0 and 4.0.");
    return;
  }

  const updatedStudent = {
    ...formData,
    gpa,
    campusId: selectedCampusId || formData.campusId
  };

  try {
    await axios.put(`/api/students/${studentId}`, updatedStudent);

   
    const updatedList = students.map((s) =>
      s.id === parseInt(studentId) ? updatedStudent : s
    );
    setStudents(updatedList);
    setIsEditing(false);
    setError("");
  } catch (err) {
    setError("Failed to update student. Please try again.");
    console.error(err);
  }
};
  return (
    <div className="card">
      <img
        src={formData.imageUrl || "https://via.placeholder.com/150"}
        alt="Student"
        width="150"
      />
      <div>
        <h2>
          {formData.firstName} {formData.lastName}
        </h2>
        <p>Email: {formData.email}</p>
        <p>GPA: {
            isNaN(Number(formData.gpa)) 
                ? "N/A" 
                : Number(formData.gpa).toFixed(2)
        }</p>

        {student.campus ? (
          <div className="student-campus">
            <h3>Enrolled at:</h3>
            <div className="campus-card">
              <img src={student.campus.imageUrl || "https://via.placeholder.com/100"} alt="Campus" width="100" />
              <a href={`/campuses/${student.campus.id}`}>{student.campus.name}</a>
            </div>
          </div>
        ) : (
          <p>This student is not registered to a campus.</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {isEditing ? (
          <div>
            <label>First Name:</label>
            <input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />

            <label>Last Name:</label>
            <input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />

            <label>Email:</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label>GPA:</label>
            <input
              type="number"
              step="0.1"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
            />

            <label>Image URL:</label>
            <input
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />

            <label>Campus:</label>
            <select value={selectedCampusId} onChange={(e) => setSelectedCampusId(e.target.value)}>
              <option value="">Select campus...</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              ))}
            </select>

            <button onClick={handleSave} className="btn-edit">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
        )}

        <button onClick={handleDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default SingleStudent;
