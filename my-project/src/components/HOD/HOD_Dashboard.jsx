import React from "react";
import { Routes, Route } from "react-router-dom";
import "../../css/dashboard.css"
import Navbar from "../Navbar";
import HOD_Sidebar from "../HOD/HOD_Sidebar";
import ApplyLeave2 from "../LeaveForm/ApplyLeave2";
import LeaveHistory from "../Teacher/LeaveHistory";
import LeaveBalance from "../Teacher/LeaveBalance";
import PendingRequest from "../HOD/PendingRequest";
import PendingRequestInfo from "../HOD/PendingRequestInfo";
import AcceptedRequest from "../HOD/AcceptedRequest";
import AcceptedRequestInfo from "../HOD/AcceptedRequestInfo";
import RejectRequest from "../HOD/RejectedRequest";
import RejectRequestInfo from "../HOD/RejectedRequestInfo";


const HOD_Dashboard = ({setLToken, setRole}) => {
  return (
      <div className="dashboard-container">
        <Navbar setLToken={setLToken} setRole={setRole}/>  {/* Top Navbar */}
        <div className="dashboard-content">
          <HOD_Sidebar /> {/* Left Sidebar */}
          <div className="main-content">
          <Routes>
            <Route path="/" element = {<LeaveBalance/>} />
            <Route path="/apply-leave" element={<ApplyLeave2 />} />
            <Route path="/leave-history" element={<LeaveHistory />} />
            <Route path="/pending-requests" element={<PendingRequest />} />
            <Route path="/pending-requests/application/:id" element={<PendingRequestInfo />} />
            <Route path="/approved-requests" element={<AcceptedRequest/>} />
            <Route path="/approved-requests/approved/:id" element={<AcceptedRequestInfo />} />
            <Route path="/rejected-requests" element={<RejectRequest />} />
            <Route path="/rejected-requests/rejected/:id" element={<RejectRequestInfo />} />
          </Routes>
        </div>
        </div>
      </div>
  );
};

export default HOD_Dashboard;
