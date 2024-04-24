import React from "react";
import "./gameLayout.css";
import TitleIcon from "../../components/fragments/TitleIcon";
import {Outlet, useNavigate} from "react-router-dom";

function GameLayout() {
  const navigate = useNavigate();
  const style = {
    background: "linear-gradient(194.68deg, #ffb548 11.27%, #f3af34 90.4%)",
    boxShadow: "2.5px 2.5px 0 1px rgba(0, 0, 0, 0.75)",
  };
  return (
    <>
      <div className="game-layout unselectable">
        <TitleIcon iconStyleCustom={style} handleClick={() => navigate("/dashboard")} />
      </div>
      <Outlet />
    </>
  );
}

export default GameLayout;
