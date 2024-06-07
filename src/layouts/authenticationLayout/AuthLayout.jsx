import React from "react";
import "./authLayout.css";
import AboutGame from "../../components/templates/AboutGame";

function AuthLayout({children}) {
  return (
    <div className={`authentication-layout ${location.pathname === "/register" && "reverse-row"}`}>
      <AboutGame />
      <main>{children}</main>
    </div>
  );
}

export default AuthLayout;
