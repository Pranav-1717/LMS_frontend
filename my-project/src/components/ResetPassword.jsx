import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"; // Using the same CSS as login
import { reset_password_api } from "../api/auth_api"; // API function to update password

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Password Reset
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Validate Passwords
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await reset_password_api(oldPassword, newPassword);

      if (response && response.status === 200) {
        setSuccessMessage("Password updated successfully.");
        setTimeout(() => navigate("/login"), 1000); // Redirect after success
      } else {
        setErrorMessage("Failed to update password. Try again.");
      }
    } catch (error) {
      console.log("Password update failed:", error);

      if (error.response) {
        setErrorMessage(error.response.data?.message || "An error occurred.");
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
              <h3 className="text-center mb-3">Reset Password</h3>
              <form onSubmit={handlePasswordUpdate}>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <label className="form-label mt-1">Old Password</label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <label className="form-label mt-1">New Password</label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label className="form-label mt-1">Confirm New Password</label>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg w-50" disabled={loading}>
                    {loading ? "Updating..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
