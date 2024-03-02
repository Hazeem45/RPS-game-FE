import React from "react";
import "./styles/profileIcon.css";
import defaultPict from "../../assets/image/default-pict.jpg";
import Image from "../elements/Image";

function ProfileIcon({userPict, handleClick}) {
  return (
    <div className="profile-icon" onClick={handleClick}>
      <Image src={userPict ? userPict : defaultPict} />
    </div>
  );
}

export default ProfileIcon;
