import React from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";

function Index({handleClick}) {
  return (
    <div className="navbar">
      <TitleIcon />
      <ProfileNav handleClick={handleClick} />
    </div>
  );
}

export default Index;
