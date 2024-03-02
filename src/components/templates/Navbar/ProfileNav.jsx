import React from "react";
import "./profileNav.css";
import ProfileIcon from "../../fragments/ProfileIcon";

function ProfileNav({username, handleClick}) {
  return (
    <div className="profile-nav">
      <h3>@{username ? username : "user.name_"}</h3>
      <div className="icon">
        <ProfileIcon handleClick={handleClick} />
      </div>
    </div>
  );
}

export default ProfileNav;
