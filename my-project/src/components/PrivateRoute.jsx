import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  // const { token } = useContext(AuthContext);
  const l_token = localStorage.getItem('l_token')
  return l_token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
