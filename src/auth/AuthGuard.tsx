import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "auth/AuthProvider";

interface Props {
  children?: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
