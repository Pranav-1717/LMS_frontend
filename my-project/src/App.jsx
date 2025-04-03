import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Teacher/Dashboard";
import HOD_Dashboard from "./components/HOD/HOD_Dashboard";
import ResetPassword from "./components/ResetPassword";
import { refresh_token_api } from "./api/auth_api"; // Import the refresh_token_api function
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  const [l_token, setLToken] = useState(localStorage.getItem("l_token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || ""); // Add role state

  // Keep token and role in sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setLToken(sessionStorage.getItem("l_token") || "");
      setRole(localStorage.getItem("role") || ""); // Sync role
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Refresh token every 9 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refresh_token_api()
        .then(response => {
          console.log("Refresh token response", response);
          if (response && response.data && response.data.accessToken) {
            const newToken = response.data.accessToken;
            sessionStorage.setItem("l_token", newToken);
            setLToken(newToken);
            console.log("Token refreshed:", newToken);
          }
        })
        .catch(error => {
          console.error("Error refreshing token:", error);
        });
    }, 9 * 60 * 1000); // 9 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={<Login setLToken={setLToken} setRole={setRole}/>} />

        {/* Signup and Reset Password Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        {/* Teacher Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={
            l_token && role === "TEACHER" ? (
              <Dashboard setLToken={setLToken} setRole={setRole}/>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* HOD Dashboard Route */}
        <Route
          path="/hod_dashboard/*"
          element={
            l_token && role === "HOD" ? (
              <HOD_Dashboard setLToken={setLToken} setRole={setRole}/>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admindashboard/*"
          element={
            l_token && role === "ADMIN" ? (
              <AdminDashboard setLToken={setLToken} setRole={setRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Login setLToken={setLToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
