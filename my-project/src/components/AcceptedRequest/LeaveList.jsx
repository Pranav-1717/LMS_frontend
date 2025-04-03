import React, { useEffect, useState } from "react";
import { getLeaveApplications } from "../../api/api";
import LeaveDetails from "./LeaveDetails";

function LeaveList() {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await getLeaveApplications();
        setLeaves(response.data || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave Applications</h2>
      {selectedLeave ? (
        <LeaveDetails leave={selectedLeave} onBack={() => setSelectedLeave(null)} />
      ) : (
        <div>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <div key={leave.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5><strong>Name:</strong> {leave.applicantName}</h5>
                  <p><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</p>
                  <p><strong>Status:</strong> {leave.status}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedLeave(leave)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No leave applications found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LeaveList;
