import React, {useEffect, useState} from "react";
import "./sidebar.css";
import ProfileIcon from "../../../components/fragments/ProfileIcon";
import StandardIcon from "../../../components/fragments/StandardIcon";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import {GearIcon} from "../../../assets/Image";

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
    <div className="sidebar unselectable">
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
            <StandardIcon icon={GearIcon} />
          </div>
        </div>
      </div>
      <div className="content-sidebar">
        {openProfile && <UserProfile />}
        {openSetting && <Settings />}
      </div>
    </div>
  );
}

export default Index;
