import React  from "react";
import { Routes, Route } from "react-router-dom";
import "../../css/dashboard.css"
import Navbar from "../Navbar";
import Sidebar from "../Teacher/Sidebar";
import LeaveHistory from "../Teacher/LeaveHistory";
import LeaveBalance from "../Teacher/LeaveBalance";
import Schedule_adjustment from "../Teacher/Schedule_adjustment";
import ApplyLeave2 from "../LeaveForm/ApplyLeave2";
import LeaveInfo from "../Teacher/LeaveInfo";

const Dashboard = ({setLToken,setRole}) => {
  return (
      <div className="dashboard-container">
        <Navbar setLToken={setLToken} setRole={setRole}/>  {/* Top Navbar */}
        <div className="dashboard-content">
          <div><Sidebar /></div> {/* Left Sidebar */}
          <div className="main-content">
            <Routes>
              <Route path="/" element = {<LeaveBalance/>} />
              <Route path="/apply-leave" element={<ApplyLeave2 />} />
              <Route path="/schedule-adjustment" element={<Schedule_adjustment />} />
              <Route path="/leave-history" element={<LeaveHistory />} />
              <Route path="/leave-history/leave/:leaveId" element={<LeaveInfo />} />
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
