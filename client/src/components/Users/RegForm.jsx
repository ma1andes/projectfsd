import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../app/Context/AuthContext";
import "./AuthForm.css"; // Reusing the same styles

function RegForm() {
  // стейты для формы
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  // хранение ошибок с фронта и с бека
  const [errors, setErrors] = useState({});
  // ожидание до получения ответа сервера (лоадер)
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors({});

    // Frontend validation
    if (password2 !== password) {
      setErrors((prev) => ({
        ...prev,
        password: ["Passwords do not match"],
      }));
      return;
    }

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: ["Password must be at least 8 characters long"],
      }));
      return;
    }

    if (!email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: ["Invalid email format"],
      }));
      return;
    }

    setIsLoading(true);
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate("/auth");
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: [error.message || "Registration failed"],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmitHandler}>
      <label>
        Username
        <input
          type="text"
          value={username}
          placeholder="Choose a username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      {errors?.username && (
        <div className="error">{errors.username.join(" & ")}</div>
      )}

      <label>
        Email
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      {errors?.email && <div className="error">{errors.email.join(" & ")}</div>}

      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {errors?.password && (
        <div className="error">{errors.password.join(" & ")}</div>
      )}

      <label>
        Confirm Password
        <input
          type="password"
          value={password2}
          placeholder="Confirm your password"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
      </label>

      {errors?.server && (
        <div className="error">{errors.server.join(" & ")}</div>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="auth-links">
        Already have an account?<Link to="/auth">Login here</Link>
      </div>
    </form>
  );
}

export default RegForm;
