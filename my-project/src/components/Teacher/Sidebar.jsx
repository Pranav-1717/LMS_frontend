import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse ,faFilePen ,faClipboardList ,faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><NavLink  to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faHouse}/> Dashboard</NavLink ></li>
        <li><NavLink  to="/dashboard/apply-leave"className={({ isActive }) => isActive ? "active" : ""} ><FontAwesomeIcon icon={faFilePen}/> Apply Leave</NavLink ></li>
        <li><NavLink  to="/dashboard/leave-history" className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faClipboardList}/>  Leave History</NavLink ></li>
        <li><NavLink  to="/dashboard/schedule-adjustment" className={({ isActive }) => isActive ? "active" : ""}><FontAwesomeIcon icon={faCalendarDays}/> Schedule Adjustment</NavLink ></li>
      </ul>
    </div>
  );
};

export default Sidebar;
