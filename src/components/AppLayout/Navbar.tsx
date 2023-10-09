import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "auth/AuthProvider";

function Navbar() {
  const auth = useAuth();

  const handleLogout = () => auth.logout();

  return (
    <div className="container">
      <Link to="/">Home</Link>
      {auth.isAuthenticated && (
        <>
          <span className="link">
            <Link to="/dashboard">Dashboard</Link>
          </span>
          <span className="link">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </>
      )}
    </div>
  );
}

export default Navbar;
