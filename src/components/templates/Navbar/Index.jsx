import React from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";
import {useProfile} from "../../../utils/UserProfileContext";

function Index() {
  const {userData} = useProfile();
  const {toggleSidebar, setIsSidebarOpen, isSidebarOpen, setOpenProfile, setOpenSetting, setOpenSearchBar, setIsHistoryOpen, isHistoryOpen} = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="navbar unselectable">
      <TitleIcon
        handleClick={() => {
          if (isSidebarOpen) {
            setOpenProfile(true);
            setOpenSetting(false);
            setOpenSearchBar(false);
            navigate(`/dashboard/profile`);
          } else {
            navigate("/dashboard");
          }
          setIsHistoryOpen(false);
          if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
          }
        }}
      />
      <ProfileNav
        username={userData.username}
        handleClick={() => {
          if (isSidebarOpen) {
            if (!isHistoryOpen) {
              navigate("/dashboard");
            }
          } else {
            if (isHistoryOpen) {
              navigate(`/dashboard/profile/history`);
            } else {
              navigate(`/dashboard/profile`);
            }
          }
          toggleSidebar();
        }}
        userPict={userData.pictureURL}
      />
    </div>
  );
}

export default Index;
