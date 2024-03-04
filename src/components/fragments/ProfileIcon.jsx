import React from "react";
import "./styles/profileIcon.css";
import Image from "../elements/Image";
import {DefaultPict} from "../../assets/Image";

function ProfileIcon({userPict, handleClick}) {
  return (
    <div className="profile-icon" onClick={handleClick}>
      <Image src={userPict ? userPict : DefaultPict} />
    </div>
  );
}

export default ProfileIcon;
