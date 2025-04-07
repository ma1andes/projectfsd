import React from "react";
import { Link } from "react-router-dom";
import RegForm from "../../components/Users/RegForm";
import "./AuthPage.css"; // Reusing the same styles

function RegPage() {
  return (
    <div className="auth-page-container">
      <h1>Create an Account</h1>
      <RegForm />
    </div>
  );
}

export default RegPage;
