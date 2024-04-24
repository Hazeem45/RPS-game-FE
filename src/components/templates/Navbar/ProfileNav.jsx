import React from "react";
import "./profileNav.css";
import ProfileIcon from "../../fragments/ProfileIcon";
import {useSidebar} from "../../../utils/SidebarContext";
import {DefaultPict} from "../../../assets/Image";

function ProfileNav({username, userPict, handleClick}) {
  const {isSidebarOpen} = useSidebar();

  return (
    <div className="profile-nav">
      <h3>@{username ? username : "user.name_"}</h3>
      <div className="icon" style={{boxShadow: isSidebarOpen ? "0 0 0px 1.5px black" : ""}}>
        <ProfileIcon classImg="center-img" handleClick={handleClick} userPict={userPict === "null" || userPict === null ? DefaultPict : userPict} />
      </div>
    </div>
  );
}

export default ProfileNav;
