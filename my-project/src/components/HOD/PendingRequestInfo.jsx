import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRequestById, acceptApplication, rejectApplication } from "../../api/hod_api"; // Import the necessary API functions

const PendingRequestInfo = () => {
  const { id } = useParams(); // Access the id from the URL
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        console.log("Fetching leave details for ID:", id);
        var response = await fetchRequestById(id); // Assuming you have this function
        if (response?.data) {
          setLeaveDetails(response.data);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetails();
  }, [id]);

  const handleApprove = async (id) => {
    try {
      console.log("Approving leave for ID:", id);
      var response = await acceptApplication(id); // Placeholder for the actual API function
      console.log("Response from accept application:", response); // Log the response for debugging
      if (response.success) {
        alert("Request approved successfully!");
        navigate('/hod_dashboard/pending-requests'); // Navigate to the previous page
      } else {
        throw new Error(response.message || "Failed to approve request.");
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      alert("Error approving leave: " + error.message); // Provide more specific error message
    }
  };

  const handleReject = async (id) => {
    try {
      console.log("Rejecting leave for ID:", id);
      var response = await rejectApplication(id); // Placeholder for the actual API function
      console.log("Response from reject application:", response); // Log the response for debugging
      if (response.success) {
        alert("Request rejected successfully!");
        navigate('/hod_dashboard/pending-requests'); // Navigate to the previous page
      } else {
        throw new Error(response.message || "Failed to reject request.");
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      alert("Error rejecting leave: " + error.message); // Provide more specific error message
    }
  };

  if (loading) return <p className="text-center">Loading leave details...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!leaveDetails) return <p className="text-center">No leave details found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave Application Details</h2>
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">{leaveDetails.natureOfLeave}</h5>
          <span
            className={`badge fs-6 p-2 text-white ${
              leaveDetails.status === "Accepted"
                ? "bg-success"
                : leaveDetails.status === "Requested"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}
          >
            {leaveDetails.status}
          </span>
          </div>
          <p>
            <strong>Applicant:</strong> {leaveDetails.applicantName}
          </p>
          <p>
            <strong>Duration:</strong> {leaveDetails.startDate} to {leaveDetails.endDate}
          </p>
          <p>
            <strong>Reason:</strong> {leaveDetails.reason}
          </p>

          {/* Add More Details */}
          <p>
            <strong>Leave Address:</strong> {leaveDetails.leaveAddress}
          </p>
          <p><strong>Alternate Arrangements:</strong></p>
          {leaveDetails.alternateArrangements && leaveDetails.alternateArrangements.length > 0 ? (
            <div className="mt-3">
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
                  <tbody className="text-center">
                    {leaveDetails.alternateArrangements.map((arrangement, i) => (
                      <tr key={i}>
                        <td>{arrangement.date}</td>
                        <td>{arrangement.startTime}</td>
                        <td>{arrangement.endTime}</td>
                        <td>{arrangement.division}</td>
                        <td>{arrangement.subject}</td>
                        <td>{arrangement.substituteTeacherId}</td>
                        <td>
                          <span className="badge d-flex align-items-center justify-content-center">
                            {arrangement.accepted ? (
                              <p className="text-success">✔</p> // Green tick
                            ) : (
                              <p className="text-danger">PENDING</p>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No alternate arrangements found.</p>
          )}

          <div className="mt-3 d-flex gap-3 ">
            <button className="btn btn-success" onClick={() => handleApprove(id)}>
              Approve
            </button>
            <button className="btn btn-danger" onClick={() => handleReject(id)}>
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequestInfo;
