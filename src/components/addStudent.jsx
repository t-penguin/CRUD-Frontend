import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const AddStudent = ({ students, setStudents }) =>{
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName ||!lastName||!email){
            setError ("All fields are required");
            return;
    }

    
    const newStudent = { id: Date.now(), firstName, lastName, email };
    console.log("New student:", newStudent);

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
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;