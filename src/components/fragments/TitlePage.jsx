import React from "react";
import "./styles/titlePage.css";

function TitlePage({children, classForTitle}) {
  return (
    <div className={`title-page ${classForTitle}`}>
      <h1>{children}</h1>
    </div>
  );
}

export default TitlePage;
