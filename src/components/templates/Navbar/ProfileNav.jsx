import React from "react";
import "./profileNav.css";
import ProfileIcon from "../../fragments/ProfileIcon";
import {useSidebar} from "../../../utils/SidebarContext";

function ProfileNav({username, handleClick}) {
  const {isSidebarOpen} = useSidebar();

  return (
    <div className="profile-nav">
      <h3>@{username ? username : "user.name_"}</h3>
      <div className="icon" style={{background: isSidebarOpen ? "yellow" : ""}}>
        <ProfileIcon handleClick={handleClick} />
      </div>
    </div>
  );
}

export default ProfileNav;
