import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "(Name is required)";
    if (!formData.teacherId.trim()) newErrors.teacherId = "(Teacher's ID is required)";
    if (!formData.email.trim()) {
      newErrors.email = "(Email is required)";
    } else if (!/\S+@\S+\.\S{2,}$/.test(formData.email)) {
      newErrors.email = "(Enter a valid email)";
    }
    if (!formData.department.trim()) newErrors.department = "(Department is required)";

    if (!formData.password) {
      newErrors.password = "(Password is required)";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "(Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&))";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "(Confirm password is required)";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "(Passwords do not match)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Registered successfully!");
      setFormData({
        name: "",
        teacherId: "",
        email: "",
        department: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      alert("Registered successfully!");
    }
  };

  return (
    <>
      <section className="SIGNUP">
        <div className="mask d-flex align-items-center h-90 gradient-custom-3">
          <div className="container h-90">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div
                  className="card"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="card-body p-5">
                    <div className="d-flex justify-content-center mb-3">
                      <img
                        src="/Images/logo2.jpg"
                        className="img-fluid"
                        alt="Logo"
                        style={{ maxWidth: "100px" }}
                      />
                    </div>
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    {successMessage && (
                      <div className="alert alert-success text-center">
                        {successMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <label className="form-label">Name</label>
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="teacherId"
                          className="form-control form-control-lg"
                          value={formData.teacherId}
                          onChange={handleChange}
                        />
                        <label className="form-label">Teacher's Id</label>
                        {errors.teacherId && <small className="text-danger">{errors.teacherId}</small>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label className="form-label">Email</label>
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="department"
                          className="form-control form-control-lg"
                          value={formData.department}
                          onChange={handleChange}
                        />
                        <label className="form-label">Department</label>
                        {errors.department && <small className="text-danger">{errors.department}</small>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-lg"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label className="form-label">Password</label>
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control form-control-lg"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <label className="form-label">Repeat your password</label>
                        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg text-body">
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Already have an account?{" "}
                        <Link to="/" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
