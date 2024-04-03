import React from "react";
import "./styles/titlePage.css";

function TitlePage({children}) {
  return (
    <div className="title-page">
      <h1>{children}</h1>
    </div>
  );
}

export default TitlePage;
