import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const API_URL = "https://example.com/api/add-teacher"; // Replace with your actual API

const ManageTeachers = () => {
  const [newTeacher, setNewTeacher] = useState({
    id: "",
    password: "",
    role: "Teacher", // Default role
    leaves: {
      casual: 0,
      medical: 0,
      earned: 0,
      compOff: 0,
      lwp: 0,
    },
  });

  const navigate = useNavigate(); // Initialize navigate

  const addTeacher = async () => {
    if (newTeacher.id && newTeacher.password) {
      try {
        const response = await axios.post(API_URL, newTeacher);
        if (response.status === 201 || response.status === 200) {
          alert("Teacher added successfully!");
          setNewTeacher({
            id: "",
            password: "",
            role: "Teacher", // Reset to default role
            leaves: { casual: 0, medical: 0, earned: 0, compOff: 0, lwp: 0 },
          });
        }
      } catch (error) {
        console.error("Error adding teacher:", error);
        alert("Failed to add teacher!");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card p-4 shadow-lg w-75" style={{ maxWidth: "900px", height: "auto" }}>
        {/* View Teacher List Button */}
        <div className="text-start mb-3">
          <button
            className="btn border border-primary text-primary"
            style={{ backgroundColor: "transparent" }}
            onMouseEnter={(e) => {
              e.target.classList.remove("text-primary", "border-primary");
              e.target.classList.add("text-white", "bg-primary");
            }}
            onMouseLeave={(e) => {
              e.target.classList.remove("text-white", "bg-primary");
              e.target.classList.add("text-primary", "border-primary");
            }}
            onClick={() => navigate("/admindashboard")} // Navigate to Teacher List
          >
            View Teachers
          </button>
        </div>

        <h2 className="text-center mb-4">Add Teacher</h2>

        {/* Teacher ID & Password Inputs */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Teacher ID"
              value={newTeacher.id}
              onChange={(e) => setNewTeacher({ ...newTeacher, id: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newTeacher.password}
              onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
            />
          </div>
        </div>

        {/* Role Selection */}
        <h5 className="text-center">Select Role</h5>
        <div className="d-flex justify-content-center mb-3">
          {["Teacher", "HOD", "Admin"].map((role) => (
            <div className="form-check form-check-inline" key={role}>
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id={`role-${role}`}
                value={role}
                checked={newTeacher.role === role}
                onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
              />
              <label className="form-check-label" htmlFor={`role-${role}`}>
                {role}
              </label>
            </div>
          ))}
        </div>

        {/* Leave Inputs */}
        <h5 className="text-center">Assign Leave Counts</h5>
        <div className="row g-3">
          {Object.entries(newTeacher.leaves).map(([leaveType, count]) => (
            <div className="col-md-4" key={leaveType}>
              <label className="form-label text-capitalize">{leaveType} Leave</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={count}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    leaves: { ...newTeacher.leaves, [leaveType]: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>

        {/* Add Teacher Button */}
        <div className="text-center mt-4">
          <button className="btn btn-success px-4 py-2" onClick={addTeacher}>
            Add Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTeachers;
