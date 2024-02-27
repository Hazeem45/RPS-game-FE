import React from "react";
import AuthLayout from "../layouts/authenticationLayout/AuthLayout";
import RegisterForm from "../components/templates/RegisterForm";

function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
