import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken, getAllTeachers, removeTeacherById } from "../../api/admin_api"; // Import API functions

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("l_token");
  setAuthToken(token);

  // Fetch all teachers
  useEffect(() => {
    getAllTeachers()
      .then((response) => {
        if (response && response.data) {
          setTeachers(response.data); // Update to use the `data` property
        }
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  // Remove a teacher
  const removeTeacher = (id) => {
    removeTeacherById(id)
      .then(() => {
        setTeachers(teachers.filter((teacher) => teacher.teacherRegistrationId !== id));
      })
      .catch((error) => console.error("Error removing teacher:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Teacher Management</h2>

      {/* Add Teacher Button */}
      <button className="btn btn-primary mb-3" onClick={() => navigate("/admindashboard/manageteacher")}>
        Add New Teacher
      </button>

      {/* Teacher List Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherRegistrationId}>
              <td>{teacher.teacherRegistrationId}</td>
              <td>{teacher.name}</td>
              <td>{teacher.department}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`teacherlist/teacher-details/${teacher.teacherRegistrationId}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersList;
