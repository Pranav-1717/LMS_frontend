import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { login_api ,first_time_login} from "../api/auth_api";
// import { AuthContext } from "../context/AuthContext";

const Login = ({setLToken,setRole}) => {
  const [teacherID, setTeacherID] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  //  Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
  
    try {
      const response = await login_api(teacherID, password);
  
      // Check if response exists
      if (response && response.status === 200 && response.data?.data) {
        localStorage.setItem("l_token", response.data.data.accessToken);
        localStorage.setItem("role", response.data.data.roles[0]);
        const l_token = localStorage.getItem("l_token");
        setLToken(l_token);

        const role = response.data.data.roles[0];
        setRole(role);
        const isFirstTimeLogin = await first_time_login();

        // if (isFirstTimeLogin) {
        //   navigate("/signup"); // Redirect to first-time login page
        // } else {
        //   if (role === "admin") {
        //     navigate("/admin-dashboard"); // Redirect to admin dashboard
        //   } else if (role === "teacher") {
        //     navigate("/teacher-dashboard"); // Redirect to teacher dashboard
        //   } else {
        //     navigate("/dashboard"); // Redirect to default dashboard
        //   }
        // }
          if (role === "ADMIN") {
            navigate("/admindashboard"); // Redirect to admin dashboard
          } else if (role === "TEACHER") {
            navigate("/dashboard"); // Redirect to teacher dashboard
          } else if(role === "HOD") {
            navigate("/hod_dashboard"); // Redirect to default dashboard
          }
      } else {
        console.log("Unexpected Response:", response);
        setErrorMessage("Login failed. Please try again later.");
      }
    } catch (error) {
      console.log("Login failed", error);
      
      // Handle different errors
      if (error.response) {
        console.log("Server Error Response:", error.response);
        if (error.response.status === 500) {
          setErrorMessage("Server error. Please try again later.");
        } else {
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="bg-white shadow-lg p-4 rounded">
              <div className="d-flex justify-content-center mb-3">
                <img src="/Images/logo2.jpg" className="img-fluid" alt="Logo" style={{ maxWidth: "100px" }} />
              </div>
              <form onSubmit={handleLogin}>
                <div className="form-outline mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={teacherID}
                    onChange={(e) => setTeacherID(e.target.value)}
                    required
                  />
                  <label className="form-label mt-1">Teacher ID</label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-label mt-1">Password</label>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg w-50" disabled={loading}>
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </div>
                <p className="small fw-bold mt-3 text-center">
                  Don't have an account? <Link to="/signup" className="link-danger">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
