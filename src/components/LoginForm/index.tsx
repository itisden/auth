import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "auth/AuthProvider";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue="user@email.com"
        />
      </div>
      <div className="form-row">
        <input
          name="password"
          type="password"
          placeholder="Password (random string)"
          defaultValue="qwery123456789"
        />
      </div>
      <div className="form-row">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
