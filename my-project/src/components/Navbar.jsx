import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";


const Navbar = () => {

  // const {token , setToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('l_token'); // Check if user is logged in

  const handleLogout = () => {
    // if(token != null) setToken(null)// Remove token on logout
    localStorage.removeItem('l_token');
    navigate("/login"); // Redirect to login page
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
