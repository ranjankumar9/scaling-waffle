import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("Login");
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={"/login"} state={location.pathname} replace />;
  }
  return children; 
};