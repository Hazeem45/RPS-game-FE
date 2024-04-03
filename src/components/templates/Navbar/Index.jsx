import React from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";

function Index({handleClick}) {
  const navigate = useNavigate();
  return (
    <div className="navbar unselectable">
      <TitleIcon handleClick={() => navigate("/")} />
      <ProfileNav handleClick={handleClick} />
    </div>
  );
}

export default Index;
