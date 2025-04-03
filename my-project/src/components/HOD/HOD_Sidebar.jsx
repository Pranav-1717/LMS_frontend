import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse ,faFilePen ,faClipboardList ,faClock , faClipboardCheck ,faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const HOD_Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/hod_dashboard" end className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faHouse}/> Dashboard</NavLink ></li>
        <li><NavLink to="/hod_dashboard/apply-leave" className={({ isActive }) => isActive ? "active" : ""} ><FontAwesomeIcon icon={faFilePen}/> Apply Leave</NavLink ></li>
        <li><NavLink to="/hod_dashboard/leave-history" className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faClipboardList}/>  Leave History</NavLink ></li>
        <li><NavLink to="/hod_dashboard/pending-requests" className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faClock}/> Pending Requests</NavLink ></li>
        <li><NavLink to="/hod_dashboard/approved-requests" className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faClipboardCheck}/> Approved Requests</NavLink ></li>
        <li><NavLink to="/hod_dashboard/rejected-requests"className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faRectangleXmark}/> Rejected Requests</NavLink ></li>
      </ul>
    </div>
  );
};

export default HOD_Sidebar;
