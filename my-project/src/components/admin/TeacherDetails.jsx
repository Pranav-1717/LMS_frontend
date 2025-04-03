import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeacherDetails } from "../../api/admin_api";

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getTeacherDetails(id)
      .then((response) => {
        if (response && response.data) {
          setTeacher(response.data);
        }
      })
      .catch((error) => console.error("Error fetching teacher details:", error));
  }, [id]);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back to List
      </button>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {teacher.post} {teacher.name}
          </h5>
          <p><strong>Subject:</strong> {teacher.subject}</p>
          <p><strong>Department:</strong> {teacher.department}</p>
          <h6>Leave Details:</h6>
          <ul>
            <li>Common Leave: {teacher.leave?.commonLeave || 0}</li>
            <li>Medical Leave: {teacher.leave?.medicalLeave || 0}</li>
            <li>Earned Leave: {teacher.leave?.earnedLeaves || 0}</li>
            <li>"C" Off: {teacher.leave?.c_off || 0}</li>
            <li>LWP: {teacher.leave?.lwp || 0}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
