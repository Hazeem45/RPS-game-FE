import React from "react";
import "./styles/profileIcon.css";
import Image from "../elements/Image";

function ProfileIcon({userPict, handleClick, classImg}) {
  return (
    <div className="profile-icon" onClick={handleClick}>
      <Image classImg={classImg} src={userPict} />
    </div>
  );
}

export default ProfileIcon;
