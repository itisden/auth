import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "components/LoginForm";
import { useAuth } from "auth/AuthProvider";

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container">
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <p>
          {user!.email}, you are in the system.{" "}
          <Link to="/dashboard">Check protected dashboard</Link>
        </p>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Home;
