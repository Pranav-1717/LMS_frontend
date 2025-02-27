import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Teacher/Dashboard";
import HOD_Dashboard from "./components/HOD/HOD_Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext, AuthProvider } from "./context/AuthContext"; // Import AuthContext


function App() {
  return (
    <AuthProvider>
      <Router>
        <MainRoutes />
      </Router>
    </AuthProvider>
  );
}

// Separate Route Handling
const MainRoutes = () => {
  // const { token} = React.useContext(AuthContext); //Get token from context
  const l_token = localStorage.getItem('l_token');


  // console.log("App.jsx token:", token);

  return (
    <Routes>
      <Route path="/login" element={l_token ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />


      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/hod_dashboard/*" element={<HOD_Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
