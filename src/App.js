import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      {/* Navbar is layout route which has outlet and rest are its children (react-router-v6) */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:code" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
