import React, { useEffect, useState } from "react";
import { fetchApprovedRequests, setAuthToken } from "../../api/hod_api"; // Assuming there's a function for fetching accepted requests
import { Link, useNavigate, Outlet } from "react-router-dom";

const AcceptedLeaveHistory = () => {
  const [AcceptedReq, setAcceptedReq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("l_token");
    if (!token) {
      console.error("No token found, redirecting to login.");
      navigate("/login");
      return;
    }
    setAuthToken(token);
    
    const fetchAcceptedRequestsData = async () => {
      try {
        var response = await fetchApprovedRequests(); // Fetch accepted requests
        if (response?.data) {
          setAcceptedReq(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching accepted leave history:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedRequestsData();
  }, [navigate]);

  if (loading) return <p className="text-center">Loading accepted leave history...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!AcceptedReq.length) return <p className="text-center">No accepted leave history found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Accepted Leave History</h2>
      {AcceptedReq.map((leave, index) => (
        <Link to={`approved/${leave.id}`} key={index} className="text-decoration-none">
          <div className="card mb-4 shadow">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{leave.natureOfLeave}</h5>
              <span className={`badge fs-6 p-2 text-white ${leave.status === "APPROVED" ? "bg-success" : leave.status === "Requested" ? "bg-warning text-dark" : "bg-danger"}`}>
                {leave.status}
              </span>

                </div>
              <p><strong>Applicant:</strong> {leave.applicantName}</p>
              <p><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* Render LeaveInfo Here */}
      <Outlet />
    </div>
  );
};

export default AcceptedLeaveHistory;
