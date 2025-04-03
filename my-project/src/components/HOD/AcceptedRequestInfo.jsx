import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAcceptedApplicationsById} from "../../api/hod_api"; // Import the necessary API functions

const AcceptedRequestInfo = () => {
  const { id } = useParams(); // Access the id from the URL
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        console.log("Fetching leave details for ID:", id);
        var response = await fetchAcceptedApplicationsById(id); // Assuming you have this function
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

  
  if (loading) return <p className="text-center">Loading leave details...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!leaveDetails) return <p className="text-center">No leave details found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave Application Details</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">{leaveDetails.natureOfLeave}</h5>
          <span
            className={`badge fs-6 p-2 text-white ${leaveDetails.status === "APPROVED" ? "bg-success" : leaveDetails.status === "Requested" ? "bg-warning text-dark" : "bg-danger"}`}
          >
            {leaveDetails.status}
          </span>
          </div>
          <p><strong>Applicant:</strong> {leaveDetails.applicantName}</p>
          <p><strong>Duration:</strong> {leaveDetails.startDate} to {leaveDetails.endDate}</p>
          <p><strong>Reason:</strong> {leaveDetails.reason}</p>

          {/* Add More Details */}
          <p><strong>Leave Address:</strong> {leaveDetails.leaveAddress}</p>
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
        </div>
      </div>
    </div>
  );
};

export default AcceptedRequestInfo;
