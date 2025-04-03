import React, { useEffect, useState } from "react";
import { getLeaveHistory, setAuthToken } from "../../api/api";
import { Link, useNavigate, Outlet } from "react-router-dom";

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
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
    
    const fetchLeaveHistory = async () => {
      try {
        const response = await getLeaveHistory();
        if (response?.data) {
          setLeaveHistory(Array.isArray(response.data) ? response.data : [response.data]);
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

    fetchLeaveHistory();
  }, [navigate]);

  if (loading) return <p className="text-center">Loading leave history...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (!leaveHistory.length) return <p className="text-center">No leave history found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave History</h2>
      {leaveHistory.map((leave, index) => (
        <Link to={`leave/${leave.id}`} key={index} className="text-decoration-none">
          <div className="card mb-4 shadow position-relative">
            <div className="card-body">
              <span className={`badge fs-6 p-2 text-white position-absolute top-0 end-0 m-2 ${
                leave.status === "APPROVED" ? "bg-success"
                : leave.status === "Requested" ? "bg-warning text-dark"
                : "bg-danger"
              }`}>
                {leave.status}
              </span>
              <h5 className="card-title">{leave.natureOfLeave}</h5>
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
