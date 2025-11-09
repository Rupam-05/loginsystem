import React, { useState } from "react";

const PasswordField = ({ value, onChange, showStrength = false }) => {
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState("");

  const togglePassword = () => setShowPass(!showPass);

  const handleStrength = (val) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const mediumRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (strongRegex.test(val)) setStrength("Strong password 💪");
    else if (mediumRegex.test(val)) setStrength("Medium password ⚡");
    else setStrength("Weak password ❌ (use A-Z, a-z, 0-9, @)");
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    if (showStrength) handleStrength(val);
  };

  return (
    <>
      <div className="input-group mt-3">
        <span className="input-group-text">
          <i className="fas fa-lock"></i>
        </span>
        <input
          type={showPass ? "text" : "password"}
          className="form-control"
          placeholder="Password"
          value={value}
          onChange={handleChange}
          required
        />
        <button
          className="btn btn-light"
          type="button"
          onClick={togglePassword}
        >
          <i className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>{" "}
          <span>{showPass ? "Hide" : "Show"}</span>
        </button>
      </div>

      {showStrength && (
        <small
          style={{
            display: "block",
            marginTop: "5px",
            fontWeight: "500",
            color:
              strength.includes("Strong")
                ? "green"
                : strength.includes("Medium")
                ? "orange"
                : "red",
          }}
        >
          {strength}
        </small>
      )}
    </>
  );
};

export default PasswordField;
