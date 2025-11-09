import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import banner from "./images/banner.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User_name");
    if (storedUser) {
      setUsername(storedUser);
    } else {
    
      navigate("/login");
    }
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("User_name");
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#72abc7", minHeight: "100vh" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand fw-bold">MySite</a>
          <div className="d-flex ms-auto align-items-center">
            {username && (
              <>
                <span className="navbar-text text-white fw-bold me-3">
                  Welcome, {username}
                </span>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}> Logout </button>       
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <img src={banner} className="img-fluid w-100" alt="Banner" />
      </section>
    </div>
  );
};

export default Dashboard;
