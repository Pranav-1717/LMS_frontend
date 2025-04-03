import React, { useState, useEffect } from "react";
import { fetchTeacherLeave,setAuthToken } from "../../api/api.js"; // Import API function

const LeaveBalance = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("l_token");
  setAuthToken(token); // Set the token for API requests

  useEffect(() => {
    const getLeaveData = async () => {
      try {
        const response = await fetchTeacherLeave(); // Fetch leave data

        // Convert API response into required format
        const formattedData = [
          { leaveType: "C-Off", remaining: response.c_off },
          { leaveType: "Common Leave", remaining: response.commonLeave },
          { leaveType: "Earned Leave", remaining: response.earnedLeaves },
          { leaveType: "LWP", remaining: response.lwp },
          { leaveType: "Medical Leave", remaining: response.medicalLeave },
        ].map((leave) => ({
          ...leave,
          total: 10, // Fixed total leaves
          used: 10 - leave.remaining, // Calculate used leaves
        }));

        setLeaveData(formattedData);
      } catch (err) {
        setError("Failed to fetch leave data");
      } finally {
        setLoading(false);
      }
    };

    getLeaveData();
  }, []);

  if (loading) {
    return <p className="text-center">Loading leave data...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Leave Overview</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>Leave Type</th>
              <th>Total Leaves</th>
              <th>Used Leaves</th>
              <th>Remaining Leaves</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr key={index}>
                <td>{leave.leaveType}</td>
                <td>{leave.total}</td>
                <td>{leave.used}</td>
                <td>{leave.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveBalance;