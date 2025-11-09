import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css"; // optional: if you have global styles
import developer from "./images/developer.png";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const gmailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (/[A-Z]/.test(email)) {
      alert("Email cannot contain capital letters. Please use all lowercase.");
      return;
    }
    if (!gmailRegex.test(email)) {
      alert("Please enter a valid Gmail address ending with @gmail.com.");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      alert(
        "Password must be at least 8 characters long and include upper, lower, number, and special symbol."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Password reset successfully!");
        window.location.href = "/login";
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="heading text-white p-4 rounded" style={{ width: "30rem", backgroundColor: "#aeb6bb" }}>
        <div className="text-center">
          <img src={developer} alt="Logo" style={{ width: "35%" }} />
          <h3>Reset Your Password</h3>
          <h6>
            Strong password including numbers, letters, and punctuation marks (maximum 8 characters)
          </h6>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group mt-3">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              maxLength="8"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type={showPass ? "text" : "password"}
              className="form-control"
              maxLength="8"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={togglePassword}
            >
              <i className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>{" "}
              <span>{showPass ? "Hide" : "Show"}</span>
            </button>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-success"
              style={{ fontSize: "1.2rem", padding: "0.5rem 2rem" }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
