import React from "react";
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

function UserProfile() {
  const {setIsSidebarOpen, setViewImage, setIsHistoryOpen} = useSidebar();
  const {userData} = useProfile();
  const navigate = useNavigate();

  return (
    <div className="profile-sidebar">
      <div className="profile">
        <h3>{userData.username ? userData.username : "Loading..."}</h3>
        <div
          style={{background: "lightgray"}}
          className="profile-picture"
          onClick={() => {
            if (userData.pictureURL !== DefaultPict && userData.pictureURL !== null) {
              setViewImage(true);
            }
          }}
        >
          {userData.pictureURL ? <Image classImg="center-img" src={userData.pictureURL} /> : <LoaderSpin />}
        </div>

        <h3>
          {userData.firstname} {userData.lastname}
        </h3>
        <div className="user-bio">{userData.infoBio}</div>
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
            <div className={`detail-info ${userData.address ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={LocationIcon} />
              </div>
              <span>{userData.address}</span>
            </div>
            <div className={`detail-info ${userData.gender ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={UserIcon} />
              </div>
              <span>{userData.gender}</span>
            </div>
            <div className={`detail-info ${userData.birthDate ? "displayInherit" : "displayNone"}`}>
              <div className="icon">
                <StandardIcon icon={CakeIcon} />
              </div>
              <span>{userData.birthDate}</span>
            </div>
            <div className="detail-info">
              <div className="icon">
                <StandardIcon icon={ClockIcon} />
              </div>
              <span>{userData.joinDate ? `Join at ${getLocaleDate(userData.joinDate).date}` : "Loading..."}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
