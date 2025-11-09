import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Dashboard from "./Dashboard";
import Reset from "./Reset";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
