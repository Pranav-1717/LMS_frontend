import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { login_api, refresh_token_api } from "../api/auth_api";
// import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // const { token, setToken} = useContext(AuthContext); 
  const [teacherID, setTeacherID] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Login useEffect - Token:", token);
  //   if (token) {
  //     console.log("Navigating to Dashboard...");
  //     navigate("/dashboard"); // Redirect if user is already logged in
  //   } else {
  //     console.log("No token found, attempting refresh...");
  //     handleRefreshToken(); // Try refreshing token on mount
  //   }
  // }, [token]);
  

  // //  Refresh Token Function
  // const handleRefreshToken = async () => {
  //   try {
  //     const response = await refresh_token_api();
  //     if (response?.data?.accessToken) {
  //       setToken(response.data.accessToken);
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log("Token refresh failed:", error);
  //   }
  // };

  //  Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // console.log("teacherID",teacherID);
      // console.log("password",password)
      const response = await login_api(teacherID, password);
      if (response.status === 200) {
        // setToken(response.data.data.accessToken);
        localStorage.setItem('l_token',response.data.data.accessToken)
        const l_token =  localStorage.getItem('l_token')
        console.log('l_token',l_token);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
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
