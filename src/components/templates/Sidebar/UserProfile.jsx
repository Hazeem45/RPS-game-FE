import React, {useEffect, useState} from "react";
import "./userProfile.css";
import Image from "../../elements/Image";
import Button from "../../elements/Button";
import StandardIcon from "../../fragments/StandardIcon";
import {CakeIcon, ClockIcon, DefaultPict, HistoryIcon, LocationIcon, UserIcon} from "../../../assets/Image";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";
import {getLocaleDate} from "../../../utils/formatDate";
import {useProfile} from "../../../utils/UserProfileContext";
import LoaderSpin from "../../fragments/LoaderSpin";

function UserProfile({playerProfile}) {
  const {setIsSidebarOpen, setViewImage, setIsHistoryOpen} = useSidebar();
  const {userData} = useProfile();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: null,
    firstname: null,
    lastname: null,
    pictureURL: null,
    info: null,
    address: null,
    gender: null,
    birthDate: null,
    joinAt: null,
  });

  useEffect(() => {
    if (location.pathname === "/dashboard/profile" || location.pathname === "/dashboard/profile/history") {
      setProfileData({
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        pictureURL: userData.pictureURL,
        info: userData.infoBio,
        gender: userData.gender,
        address: userData.address,
        birthDate: userData.birthDate,
        joinAt: userData.joinDate,
      });
    } else {
      setProfileData({
        username: playerProfile.username,
        firstname: playerProfile.firstname,
        lastname: playerProfile.lastname,
        pictureURL: playerProfile.pictureURL,
        info: playerProfile.info,
        gender: playerProfile.gender,
        address: playerProfile.address,
        birthDate: playerProfile.birthDate,
        joinAt: playerProfile.joinAt,
      });
    }
  }, [userData, playerProfile]);

  return (
    <div className="profile-sidebar">
      <div className="profile">
        <h3>{profileData.username ? profileData.username : "Loading..."}</h3>
        <div
          style={{background: "lightgray"}}
          className="profile-picture"
          onClick={() => {
            if (profileData.pictureURL !== DefaultPict && profileData.pictureURL !== null) {
              setViewImage(true);
            }
          }}
        >
          {profileData.pictureURL ? (
            <Image classImg="center-img" src={profileData.pictureURL} />
          ) : (
            <div style={{background: "lightgrey", width: "100%", height: "100%", padding: "10px", boxSizing: "border-box"}}>
              <LoaderSpin />
            </div>
          )}
        </div>

        <h3>
          {profileData.firstname} {profileData.lastname}
        </h3>
        <div className="user-bio">{profileData.info}</div>
      </div>
      <div style={{width: "100%"}}>
        <Button
          handleClick={() => {
            setIsHistoryOpen(true);
            navigate(`/dashboard/profile/history`);
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
            <div className={`detail-info ${profileData.address ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={LocationIcon} />
              </div>
              <span>{profileData.address}</span>
            </div>
            <div className={`detail-info ${profileData.gender ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={UserIcon} />
              </div>
              <span>{profileData.gender}</span>
            </div>
            <div className={`detail-info ${profileData.birthDate ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={CakeIcon} />
              </div>
              <span>{profileData.birthDate}</span>
            </div>
            <div className="detail-info">
              <div className="icon">
                <StandardIcon icon={ClockIcon} />
              </div>
              <span>{profileData.joinAt ? `Join at ${getLocaleDate(profileData.joinAt).date}` : "Loading..."}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
