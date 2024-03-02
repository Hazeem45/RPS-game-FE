import React, {useEffect, useState} from "react";
import "./sidebar.css";
import gearIcon from "../../../assets/image/gear-icon.png";
import ProfileIcon from "../../../components/fragments/ProfileIcon";
import StandardIcon from "../../../components/fragments/StandardIcon";
import UserProfile from "./UserProfile";
import Settings from "./Settings";

function Index({status}) {
  const [openProfile, setOpenProfile] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);

  useEffect(() => {
    if (status === "close") {
      setOpenProfile(true);
      setOpenSetting(false);
    }
  }, [status]);

  return (
    <div className="sidebar">
      <div className="option-sidebar">
        <div
          className="profile"
          onClick={() => {
            setOpenProfile(true);
            setOpenSetting(false);
          }}
        >
          <div className="icon">
            <ProfileIcon />
          </div>
        </div>
        <div
          className="setting"
          onClick={() => {
            setOpenProfile(false);
            setOpenSetting(true);
          }}
        >
          <div className="icon">
            <StandardIcon icon={gearIcon} />
          </div>
        </div>
      </div>
      <div className="content-sidebar">
        {openProfile && (
          <UserProfile
            username="max.more_gaminx"
            fullname="Marc Murph"
            userBio="nopo bener ikan berkepala lele itu aseli, tulung penjelesannya. ASUI"
            address="Republic of Isekai"
            gender="Male"
            birthday="17 August 1945"
            join="03 March 2024"
          />
        )}
        {openSetting && <Settings />}
      </div>
    </div>
  );
}

export default Index;
