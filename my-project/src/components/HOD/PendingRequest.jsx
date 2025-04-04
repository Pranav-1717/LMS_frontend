import React, { useEffect, useState } from "react";
import { fetchPendingRequests, setAuthToken } from "../../api/hod_api";
import { Link, useNavigate, Outlet } from "react-router-dom";

const LeaveHistory = () => {
  const [PendingReq, setPendingReq] = useState([]);
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
    
    const PendingRequests = async () => {
      try {
        var response = await fetchPendingRequests();
        if (response?.data) {
          setPendingReq(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching leave history:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    PendingRequests();
  }, [navigate]);

  if (loading) return <p className="text-center">Loading leave history...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!PendingReq.length) return <p className="text-center">No leave history found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Pending Request</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      {PendingReq.map((leave, index) => (
        <Link to={`application/${leave.id}`} key={index} className="text-decoration-none">
          <div className="card mb-4 shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">{leave.natureOfLeave}</h5>
              <span className={`badge fs-6 p-2 text-white ${leave.status === "Accepted" ? "bg-success" : leave.status === "Requested" ? "bg-warning text-dark" : "bg-danger"}`}>
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

export default LeaveHistory;
