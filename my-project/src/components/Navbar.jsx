import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Teacher/context/AuthContext";


const Navbar = ({setLToken,setRole}) => {

  // const {token , setToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const l_token = localStorage.getItem("l_token");
  const role = localStorage.getItem("role");
  const isAuthenticated = l_token

  const handleLogout = () => {
    localStorage.removeItem("l_token");
    localStorage.removeItem("role");
    console.log("Token on logout");
    const token = localStorage.getItem('l_token');
    const Role = localStorage.getItem('role');
    setLToken(token);
    setRole(Role);
    navigate("/");
  };

  return (
    <nav className="navbar py-2 position-sticky">
      <div className="navbar-brand d-flex gap-1 justify-content-center align-items-center">
        <img src="/Images/logo.png" className="img-fluid" alt="Logo" style={{ maxWidth: "40px" ,height:"40px"}} />
        EduLeave 
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-secondary text-decoration-none logout-btn">Logout</button>
        ) : (
          <Link to="/login " className="btn btn-secondary text-decoration-none">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
