import React from "react";
import "./userProfile.css";
import Image from "../../elements/Image";
import Button from "../../elements/Button";
import StandardIcon from "../../fragments/StandardIcon";
import {CakeIcon, ClockIcon, DefaultPict, HistoryIcon, LocationIcon, UserIcon} from "../../../assets/Image";
import {useNavigate} from "react-router-dom";

function UserProfile({username, userBio, fullname, address, gender, birthday, join}) {
  const navigate = useNavigate();

  return (
    <div className="profile-sidebar">
      <div className="profile">
        <h3>@{username ? username : "user.name_"}</h3>
        <div className="profile-picture">
          <Image src={DefaultPict} />
        </div>
        <h3>{fullname}</h3>
        <div className="user-bio">{userBio}</div>
      </div>
      <div style={{width: "100%"}}>
        <Button handleClick={() => navigate("/history")}>
          <div className="icon">
            <StandardIcon icon={HistoryIcon} />
          </div>
          <span>Game History</span>
        </Button>
        <div className="about-user">
          <h3>Intro</h3>
          <div className="detail">
            <div className={`detail-info ${address ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={LocationIcon} />
              </div>
              <span>{address}</span>
            </div>
            <div className={`detail-info ${gender ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={UserIcon} />
              </div>
              <span>{gender}</span>
            </div>
            <div className={`detail-info ${birthday ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={CakeIcon} />
              </div>
              <span>{birthday}</span>
            </div>
            <div className="detail-info">
              <div className="icon">
                <StandardIcon icon={ClockIcon} />
              </div>
              <span>Joined On {join}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
