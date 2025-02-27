import React from "react";
import { Routes, Route } from "react-router-dom";
import "../../css/dashboard.css"
import Navbar from "../Navbar";
import HOD_Sidebar from "../HOD/HOD_Sidebar";
import ApplyLeave from "../ApplyLeave";
import LeaveHistory from "../Teacher/LeaveHistory";
import LeaveBalance from "../Teacher/LeaveBalance";
import PendingRequest from "../HOD/PendingRequest";
import AcceptedRequests from "../HOD/AcceptedRequests";
import RejectedRequests from "../HOD/RejectedRequests";

const HOD_Dashboard = () => {
  return (
      <div className="dashboard-container">
        <Navbar />  {/* Top Navbar */}
        <div className="dashboard-content">
          <HOD_Sidebar /> {/* Left Sidebar */}
          <div className="main-content">
          <Routes>
            <Route path="/" element = {<LeaveBalance/>} />
            <Route path="/apply-leave" element={<ApplyLeave />} />
            <Route path="/leave-history" element={<LeaveHistory />} />
            <Route path="/pending-requests" element={<PendingRequest />} />
            <Route path="/accepted-requests" element={<AcceptedRequests />} />
            <Route path="/rejected-requests" element={<RejectedRequests />} />
          </Routes>
        </div>
        </div>
      </div>
  );
};

export default HOD_Dashboard;
