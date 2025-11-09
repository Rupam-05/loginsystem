import React from "react";

const InputField = ({ icon, type, placeholder, value, onChange, maxLength }) => {
  return (
    <div className="input-group mt-3">
      <span className="input-group-text">
        <i className={`fas ${icon}`}></i>
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
