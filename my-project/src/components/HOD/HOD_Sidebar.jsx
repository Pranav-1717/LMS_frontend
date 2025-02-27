import React from "react";
import { Link } from "react-router-dom";
import "../../css/dashboard.css";

const HOD_Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/hod_dashboard">Dashboard</Link></li>
        <li><Link to="/hod_dashboard/apply-leave">Apply Leave</Link></li>
        <li><Link to="/hod_dashboard/leave-history">Leave History</Link></li>
        <li><Link to="/hod_dashboard/pending-requests">Pending Requests</Link></li>
        <li><Link to="/hod_dashboard/accepted-requests">Accepted Requests</Link></li>
        <li><Link to="/hod_dashboard/rejected-requests">Rejected Requests</Link></li>
      </ul>
    </div>
  );
};

export default HOD_Sidebar;
