import React from "react";
import "./styles/loader.css";

function LoaderSpin({customLoader}) {
  return (
    <div className="box-loader-circle">
      <div className="loader" style={customLoader}></div>
    </div>
  );
}

export default LoaderSpin;
