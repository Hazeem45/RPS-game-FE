import React, {useState} from "react";
import "./userProfile.css";
import Image from "../../elements/Image";
import Button from "../../elements/Button";
import StandardIcon from "../../fragments/StandardIcon";
import {CakeIcon, ClockIcon, DefaultPict, HistoryIcon, LocationIcon, UserIcon} from "../../../assets/Image";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";

function UserProfile({username, userBio, fullname, address, gender, birthday, join}) {
  const {setAnimationSidebar, setIsSidebarOpen, setViewImage, setIsHistoryOpen} = useSidebar();

  const navigate = useNavigate();
  const userPict = localStorage.getItem("foto");

  return (
    <div className="profile-sidebar">
      <div className="profile">
        <h3>@{username ? username : "user.name_"}</h3>
        <div
          className="profile-picture"
          onClick={() => {
            if (userPict === "null" || userPict === null) {
              alert("No Profile Photo");
              setViewImage(false);
            } else {
              setViewImage(true);
            }
          }}
        >
          <Image classImg="center-img" src={userPict === "null" || userPict === null ? DefaultPict : userPict} />
        </div>

        <h3>{fullname}</h3>
        <div className="user-bio">{userBio}</div>
      </div>
      <div style={{width: "100%"}}>
        <Button
          handleClick={() => {
            setIsHistoryOpen(true);
            navigate(`/dashboard/profile/${username}/history`);
            setAnimationSidebar("");
            if (window.innerWidth <= 768) {
              setIsSidebarOpen(false);
            }
          }}
        >
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
