import React from "react";
import leaveRequests from "../../Data/leaveRequests";

const RejectedRequests = () => {
  const rejectedLeaves = leaveRequests.filter((leave) => leave.status === "Rejected");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Rejected Leave Requests</h2>

      {rejectedLeaves.length > 0 ? (
        rejectedLeaves.map((leave) => (
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

              {/* Status Badge */}
              <span className="badge bg-danger fs-6 p-2">Rejected</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No rejected leave requests.</p>
      )}
    </div>
  );
};

export default RejectedRequests;
