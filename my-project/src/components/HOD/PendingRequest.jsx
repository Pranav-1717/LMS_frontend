import React, { useState } from "react";
import leaveRequests from "../../Data/leaveRequests";

const PendingRequest = () => {
  // Maintain local state for leave requests
  const [requests, setRequests] = useState(leaveRequests);

  // Approve leave request
  const handleApprove = (id) => {
    setRequests(
      requests.map((leave) =>
        leave.id === id ? { ...leave, status: "Accepted" } : leave
      )
    );
  };

  // Reject leave request
  const handleReject = (id) => {
    setRequests(
      requests.map((leave) =>
        leave.id === id ? { ...leave, status: "Rejected" } : leave
      )
    );
  };

  // Filter only pending requests
  const pendingLeaves = requests.filter((leave) => leave.status === "Pending");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Pending Leave Requests</h2>

      {pendingLeaves.length > 0 ? (
        pendingLeaves.map((leave) => (
          <div key={leave.id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              {/* Leave Details */}
              <div>
                <h5 className="card-title">{leave.leaveNature}</h5>
                <p><strong>Applicant:</strong> {leave.applicantName}</p>
                <p><strong>Post:</strong> {leave.post}</p>
                <p><strong>Duration:</strong> {leave.duration}</p>
                <p><strong>No. of Days:</strong> {leave.daysRequired}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p><strong>Alternate Arrangement:</strong> {leave.alternateArrangement}</p>
              </div>

              {/* Status Badge and Action Buttons */}
              <div>
                <span className="badge bg-warning text-dark fs-6 p-2">Pending</span>
                <div className="mt-3">
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(leave.id)}>
                    Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(leave.id)}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No pending leave requests.</p>
      )}
    </div>
  );
};

export default PendingRequest;
