import React from "react";
import { Link } from "react-router-dom";

const AllStudents = ({ students }) => {
  return (
    <div>
      <h2>All Students</h2>
      <Link to="/addStudent" className="btn">🧑‍🎓 Add Student</Link>

      <div className="grid">
        {students.length === 0 ? (
          <p>No students available.</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="card">
              <img
                src={student.imageUrl || "https://via.placeholder.com/100"}
                alt="Student Thumb"
              />
              <div>
                <Link to={`/students/${student.id}`}>
                  <strong>{student.firstName} {student.lastName}</strong>
                </Link>
                <p>Email: {student.email}</p>
                <p>GPA: {student.gpa?.toFixed(2) ?? "N/A"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllStudents;
