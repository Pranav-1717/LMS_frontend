import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import ManageTeachers from "../admin/ManageTeachers";
import TeachersList from "../admin/TeacherList";
import TeacherDetails from './TeacherDetails';

function AdminDashboard({setLToken,setRole}) {
  return (
    <div className="dashboard-container">
        <Navbar setLToken={setLToken} setRole={setRole}/>  {/* Top Navbar */}
          <div className="main-content">
          <Routes>
            <Route path="/" element = {<TeachersList/>} />
            <Route path="/manageteacher" element={<ManageTeachers />} />
            <Route path="/teacherlist" element={<TeachersList />} />
            <Route path="/teacherlist/teacher-details/:id" element={<TeacherDetails />} />
          </Routes>
        </div>
      </div>
  )
}

export default AdminDashboard