import React, { useEffect, useState } from "react";
import { getLeaveDetails, setAuthToken } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";

const LeaveInfo = () => {
  const { leaveId } = useParams();
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log("Leave ID:", leaveId);
  console.log("On Leave Details Page");
  useEffect(() => {
    const token = localStorage.getItem("l_token");
    if (!token) {
      console.error("No token found, redirecting to login.");
      navigate("/login");
      return;
    }
    setAuthToken(token);
    console.log("Token set:", token);

    const fetchLeaveDetails = async () => {
      try {
        const response = await getLeaveDetails(leaveId);
        console.log("Leave Details Response:", response);
        setLeaveDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching leave details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetails();
  }, [leaveId, navigate]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave Details</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      {leaveDetails && (
        <div className="card mb-4 shadow">
          <div className="card-body">
            <h5 className="card-title">{leaveDetails.natureOfLeave}</h5>
            <p>
              <strong>Applicant:</strong> {leaveDetails.applicantName}
            </p>
            <p>
              <strong>Duration:</strong> {leaveDetails.startDate} to{" "}
              {leaveDetails.endDate}
            </p>
            <p>
              <strong>No. of Days:</strong> {leaveDetails.numberOfDays}
            </p>
            <p>
              <strong>Reason:</strong> {leaveDetails.reason}
            </p>
            <p>
              <strong>Leave Address:</strong> {leaveDetails.leaveAddress}
            </p>
            {leaveDetails.imageURL && (
              <p>
                <strong>Attachment:</strong>{" "}
                {leaveDetails.imageURL.match(/\.(pdf|docx|xlsx)$/i) ? (
                  <a href={leaveDetails.imageURL} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/path/to/file-icon.png" // Replace with the actual file icon path
                      alt="File Icon"
                      style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    />
                  </a>
                ) : (
                  <img
                    src={leaveDetails.imageURL}
                    alt="Attachment"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
              </p>
            )}
            {leaveDetails.alternateArrangements &&
              leaveDetails.alternateArrangements.length > 0 && (
                <div className="mt-3">
                  <h6 className="fw-bold">Alternate Arrangements</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead className="table-light text-center">
                        <tr>
                          <th>Date</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Division</th>
                          <th>Subject</th>
                          <th>Faculty</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-center table-striped">
                        {leaveDetails.alternateArrangements.map(
                          (arrangement, i) => (
                            <tr key={i}>
                              <td>{arrangement.date}</td>
                              <td>{arrangement.startTime}</td>
                              <td>{arrangement.endTime}</td>
                              <td>{arrangement.division}</td>
                              <td>{arrangement.subject}</td>
                              <td>{arrangement.substituteTeacherId}</td>
                              <td>
                                <span className="badge d-flex align-items-center justify-content-center">
                                  {
                                    arrangement.accepted ? (
                                      <p className="text-success">✔</p> // Green tick
                                    ) : (
                                      <p className="text-danger">PENDING</p>
                                    ) // Red PENDING
                                  }
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveInfo;
