import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedIn = !!localStorage.getItem("ACCESS_TOKEN");
  return loggedIn ? children : <Navigate to="/login" replace />;
};
export default PrivateRoute;
