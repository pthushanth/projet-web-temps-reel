import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthLoading,
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (!isAuthLoading) {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
