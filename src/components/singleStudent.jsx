import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleStudent = ({ students, setStudents }) => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === parseInt(studentId));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student || {});
  const [error, setError] = useState("");

  if (!student) return <p>Student not found.</p>;

  const handleDelete = () => {
    const updated = students.filter((s) => s.id !== student.id);
    setStudents(updated);
    navigate("/students");
  };

  const handleSave = () => {
    
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

    
    const updated = students.map((s) =>
      s.id === student.id ? formData : s
    );
    setStudents(updated);
    setIsEditing(false);
    setError("");
  };

  return (
    <div>
      <h2>
        {formData.firstName} {formData.lastName}
      </h2>
      <p>Email: {formData.email}</p>
      <p>GPA: {formData.gpa}</p>
      <img
        src={formData.imageUrl || "https://via.placeholder.com/150"}
        alt="Student"
        width="150"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isEditing ? (
        <>
          <div>
            <label>First Name:</label>
            <input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Last Name:</label>
            <input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label>GPA:</label>
            <input
              type="number"
              step="0.1"
              value={formData.gpa}
              onChange={(e) =>
                setFormData({ ...formData, gpa: e.target.value })
              }
            />
          </div>

          <div>
            <label>Image URL:</label>
            <input
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
        Delete
      </button>
    </div>
  );
};

export default SingleStudent;
