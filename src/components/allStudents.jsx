import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const [students,setStudents]= useState ([])
};

useEffect(()=>{
    const fillerStudents = [
        {id: 1, firstName:"Joseph",lastName:"Shaikh"},
        {id: 2, firstName:"Olivia",lastName:"K"}
    ];
    setStudents(fillerStudents);
},
[]);

return(
    <div>
        <h2>All Students</h2>
        <Link to="/addStudent">🧑‍🎓Add Student</Link>
        <ul>
            {students.length=== 0 ?(
                <p>No students available</p>
            ):(
                students.map((student)=>(
                    <li key= {student.id}>
                        {student.firstName} {student.lastName}
                        <Link to={`/students/${student.id}`}>View Details</Link>
                    </li>
                ))
            )}
        </ul>
    </div>
);



export default AllStudents;
