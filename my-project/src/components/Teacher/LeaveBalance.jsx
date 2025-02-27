import React,{useContext} from "react";
import leaveBalanceData from "../../Data/LeaveBalanceData.js"; // Import JSON
// import { AuthContext } from "../../context/AuthContext";

const LeaveBalance = () => {
  //  const { token } = useContext(AuthContext); // Get token from context
  // console.log("leave balance jsx token" , token);

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
            {leaveBalanceData.map((leave, index) => (
              <tr key={index}>
                <td>{leave.leaveType}</td>
                <td>{leave.total}</td>
                <td>{leave.used}</td>
                <td>
                  {leave.total === "Unlimited" ? "N/A" : leave.total - leave.used}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveBalance;
