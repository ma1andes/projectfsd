import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/Users/AuthForm";
import "./AuthPage.css";

function AuthPage() {
  return (
    <div className="auth-page-container">
      <h1>Sign In to Tea Blog</h1>
      <AuthForm />
    </div>
  );
}

export default AuthPage;
