import React from "react";
import "./styles/profileIcon.css";
import Image from "../elements/Image";
import LoaderSpin from "./LoaderSpin";

function ProfileIcon({userPict, handleClick, classImg}) {
  return (
    <div className="profile-icon" onClick={handleClick}>
      {userPict ? (
        <Image classImg={classImg} src={userPict} />
      ) : (
        <div style={{background: "lightgrey", width: "100%", height: "100%", padding: "3px", boxSizing: "border-box"}}>
          <LoaderSpin customLoader={{border: "4px solid black"}} />
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
