import React from "react";
import developer from "../images/developer.png";

const AuthContainer = ({ title, children }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa", fontFamily: "'Roboto', sans-serif" }}
    >
      <div
        className="heading text-center p-4 rounded shadow"
        style={{ backgroundColor: "#3598DC", maxWidth: "500px" }}
      >
        <img src={developer} alt="logo" width="120" />
        <h3 className="mt-2 text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
