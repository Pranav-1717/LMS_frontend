import React from "react";
import leaveHistoryData from "../../Data/LeaveData.js"; // Import JSON

const LeaveHistory = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave History</h2>

      {leaveHistoryData.map((leave) => (
        <div key={leave.id} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            {/* Leave Details */}
            <div>
              <h5 className="card-title">{leave.leaveNature}</h5>
              <p className="mb-1"><strong>Duration:</strong> {leave.duration}</p>
              <p className="mb-1"><strong>No. of Days:</strong> {leave.days}</p>
              <p className="mb-1"><strong>Reason:</strong> {leave.reason}</p>
              <p className="mb-1"><strong>Alternate Arrangement:</strong> {leave.alternateArrangement}</p>
            </div>

            {/* Status Badge */}
            <span
              className={`badge fs-6 p-2 text-white ${
                leave.status === "Accepted"
                  ? "bg-success"
                  : leave.status === "Requested"
                  ? "bg-warning text-dark"
                  : "bg-danger"
              }`}
            >
              {leave.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveHistory;
