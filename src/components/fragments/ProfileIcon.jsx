import React from "react";
import "./styles/profileIcon.css";
import Image from "../elements/Image";
import {DefaultPict} from "../../assets/Image";

function ProfileIcon({userPict, handleClick, classImg}) {
  return (
    <div className="profile-icon" onClick={handleClick}>
      <Image classImg={classImg} src={userPict ? userPict : DefaultPict} />
    </div>
  );
}

export default ProfileIcon;
