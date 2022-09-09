import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PrivateRoute;
