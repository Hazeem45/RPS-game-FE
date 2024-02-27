import React from "react";
import "./authLayout.css";
import AboutGame from "../../components/templates/AboutGame";

function AuthLayout({children}) {
  const authType = children.type.name;

  return (
    <div className={`authentication-layout ${authType === "LoginForm" ? "" : "reverse-row"}`}>
      <AboutGame />
      <main>{children}</main>
    </div>
  );
}

export default AuthLayout;
