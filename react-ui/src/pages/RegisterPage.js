import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser({ email, password });
      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error registering. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register 🌱</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            color: "#4caf50",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
