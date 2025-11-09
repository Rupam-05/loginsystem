import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    const nameRegex = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/;
    if (!nameRegex.test(name)) {
      alert("Name must start with a capital letter.");
      return false;
    }
    if (number.length !== 10) {
      alert("Enter valid 10-digit mobile number.");
      return false;
    }
    const gmailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      alert("Enter a valid Gmail address.");
      return false;
    }
    const strongPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!strongPass.test(password)) {
      alert("Weak password!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: number, email, password }),
      });
      const result = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        sessionStorage.setItem("User_name", name);
        navigate("/login");
      } else {
        alert(result.message);
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <AuthContainer title="Create New Account">
      <form onSubmit={handleSubmit} className="mt-4 text-start">
        <InputField
          icon="fa-user"
          type="text"
          placeholder="Name"
          value={name}
          maxLength={30}
          onChange={(e) =>
            setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))
          }
        />
        <InputField
          icon="fa-phone"
          type="tel"
          placeholder="+91"
          value={number}
          maxLength={10}
          onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <InputField
          icon="fa-envelope"
          type="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField value={password} onChange={setPassword} showStrength />
        <SubmitButton text="Sign up" />
      </form>

      <div className="d-flex justify-content-center mt-3">
        <p className="login-text text-white">
          Already member?{" "}
          <a
            href="#"
            onClick={() => navigate("/login")}
            className="text-light text-decoration-underline"
          >
            Log in
          </a>
        </p>
      </div>
    </AuthContainer>
  );
};

export default Signup;
