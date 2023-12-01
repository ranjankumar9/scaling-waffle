import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute2 = ({ children }) => {
  const isAuth = localStorage.getItem("signup");
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={"/Register"} state={location.pathname} replace />;
  }
  return children; 
};