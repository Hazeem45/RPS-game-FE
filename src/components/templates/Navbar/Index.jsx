import React from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";

function Index() {
  const {toggleSidebar, setAnimationSidebar} = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="navbar unselectable">
      <TitleIcon
        handleClick={() => {
          navigate("/");
          setAnimationSidebar("");
        }}
      />
      <ProfileNav
        handleClick={() => {
          toggleSidebar();
          setAnimationSidebar("sidebar-open");
        }}
      />
    </div>
  );
}

export default Index;
