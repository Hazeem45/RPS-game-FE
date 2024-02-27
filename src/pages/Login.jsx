import React from "react";
import LoginForm from "../components/templates/LoginForm";
import AuthLayout from "../layouts/authenticationLayout/AuthLayout";

function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
