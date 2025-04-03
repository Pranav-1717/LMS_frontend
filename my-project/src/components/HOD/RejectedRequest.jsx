import React, { useEffect, useState } from "react";
import { fetchRejectedRequests, setAuthToken } from "../../api/hod_api";
import { Link, useNavigate, Outlet } from "react-router-dom";

const RejectRequest = () => {
  const [rejectedReq, setRejectedReq] = useState([]);
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
    
    const fetchRejectedRequestsData = async () => {
      try {
        const response = await fetchRejectedRequests();
        if (response?.data) {
          setRejectedReq(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching rejected leave history:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedRequestsData();
  }, [navigate]);

  if (loading) return <p className="text-center">Loading rejected leave requests...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!rejectedReq.length) return <p className="text-center">No rejected leave requests found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Rejected Leave Requests</h2>
      {rejectedReq.map((leave, index) => (
        <Link to={`rejected/${leave.id}`} key={index} className="text-decoration-none">
          <div className="card mb-4 shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">{leave.natureOfLeave}</h5>
              <span className={`badge fs-6 p-2 text-white ${leave.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                {leave.status}
              </span>
              </div>
              <p><strong>Applicant:</strong> {leave.applicantName}</p>
              <p><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* Render RejectRequestInfo Here */}
      <Outlet />
    </div>
  );
};

export default RejectRequest;
