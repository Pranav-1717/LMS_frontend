import React from "react";
import { Link } from "react-router-dom"; 


function Signup() {
  return (
    <>
      <section className="SIGNUP">
        <div className="mask d-flex align-items-center h-90 gradient-custom-3">
          <div className="container h-90">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "12px !important", boxShadow:" 0px 4px 15px rgba(0, 0, 0, 0.1)"}}>
                  <div className="card-body p-5">
                  <div className="d-flex justify-content-center mb-3">
                    <img src="/Images/logo2.jpg" className="img-fluid" alt="Logo" style={{ maxWidth: "100px" }} />
                  </div>
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form>
                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example1cg">Name</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example1cg">Teacher's Id</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example3cg">Email</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example1cg">Department</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
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
