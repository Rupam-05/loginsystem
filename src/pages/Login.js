import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        sessionStorage.setItem("User_name", data.user.name);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch {
      alert("Error connecting to server.");
    }
  };

  return (
    <AuthContainer title="Login to your account">
      <form onSubmit={handleLogin} className="mt-4 text-start">
        <InputField
          icon="fa-envelope"
          type="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField value={password} onChange={setPassword} />
        <div className="text-center mt-3">
          <a href="/Reset" className="text-light text-decoration-underline">
            Forgot your password?
          </a>
        </div>
        <SubmitButton text="Log in" />
        <div className="text-center mt-3 text-light">
          <p className="mb-0">
            Don't have an account?{" "}
            <a
              href="/Signup"
              className="text-light text-decoration-underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Login;
