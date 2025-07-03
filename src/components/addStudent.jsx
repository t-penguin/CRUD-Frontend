import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = ({ students, setStudents }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const parsedGpa = parseFloat(gpa);
    if (isNaN(parsedGpa) || parsedGpa < 0.0 || parsedGpa > 4.0) {
      setError("GPA must be between 0.0 and 4.0.");
      return;
    }

    const newStudent = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        gpa: parsedGpa,
        imageUrl: imageUrl || "https://via.placeholder.com/150"
    };


    setStudents([...students, newStudent]);
    navigate("/students");
  };

  return (
    <div>
      <h2>Add New Student</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>GPA:</label>
          <input
            type="number"
            step="0.1"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        {imageUrl && (
          <div style={{ margin: "1rem 0" }}>
            <img src={imageUrl} alt="Student Preview" width="150" />
          </div>
        )}
        {(imageUrl || true) && (
        <div style={{ margin: "1rem 0" }}>
            <img
            src={imageUrl || "https://via.placeholder.com/150"}
            alt="Student Preview"
            width="150"
            />
        </div>
        )}

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
