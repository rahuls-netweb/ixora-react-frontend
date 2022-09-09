import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  if (!user) return <Outlet />;
  return <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
