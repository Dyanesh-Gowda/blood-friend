import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user"; // Adjust the path as needed
import "../App.css"; // Import the App.css file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const data = response.data;

      console.log("Login response data:", data); // Debugging log

      // Store userType, userId, and hospitalId in local storage
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userId", data.userId);
      if (data.hospitalId !== null) {
        localStorage.setItem("hospitalId", data.hospitalId);
      }

      if (data.userType === "user") {
        navigate("/hosp-list");
      } else if (data.userType === "hospital") {
        navigate("/users-list");
      } else {
        console.error("Unknown user type received:", data.userType); // Debugging log
        alert("Unknown user type");
      }
    } catch (error) {
      console.error("Login failed:", error); // Debugging log
      alert(
        "Login failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Login
          </button>
          <div className="text-center mt-3">
            <span>New User? </span>
            <a href="/create-user">Create your account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
