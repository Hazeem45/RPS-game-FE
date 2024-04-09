import React from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";

function Index() {
  const {toggleSidebar, setAnimationSidebar} = useSidebar();
  const navigate = useNavigate();
  const userPict = localStorage.getItem("foto");

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
        userPict={userPict}
      />
    </div>
  );
}

export default Index;
