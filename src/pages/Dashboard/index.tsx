import React from "react";
import { useAuth } from "auth/AuthProvider";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard Page</h1>
      <p>Hi, {user!.email}!</p>
    </div>
  );
}

export default Dashboard;
