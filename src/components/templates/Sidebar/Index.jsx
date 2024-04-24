import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./sidebar.css";
import ProfileIcon from "../../../components/fragments/ProfileIcon";
import StandardIcon from "../../../components/fragments/StandardIcon";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import {DefaultPict, GearIcon} from "../../../assets/Image";
import {useSidebar} from "../../../utils/SidebarContext";
import {useNavigate} from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const {animationSidebar, openProfile, setOpenProfile, openSetting, setOpenSetting, setTitle, setIsMenuSettingVisible, setIsEditProfileVisible, setIsEditBiodataVisible, setIsPersonalDetailVisible, setIsHistoryOpen, isHistoryOpen} =
    useSidebar();
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 500px)").matches);
  const backgroundColor = () => {
    if (matches) {
      return "gray";
    } else {
      return "rgb(36, 37, 38)";
    }
  };
  const username = localStorage.getItem("username");

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    const mediaQuery = window.matchMedia("(min-width: 500px)");
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className={`sidebar unselectable ${animationSidebar}`}>
      <div className="option-sidebar">
        <div
          style={{background: openProfile ? backgroundColor() : ""}}
          className="profile"
          onClick={() => {
            setOpenProfile(true);
            setOpenSetting(false);
            navigate(isHistoryOpen ? `/dashboard/profile/${username}/history` : `/dashboard/profile/${username}`);
          }}
        >
          <div className="icon">
            <ProfileIcon userPict={DefaultPict} />
          </div>
        </div>
        <div
          style={{background: openSetting ? backgroundColor() : ""}}
          className="setting"
          onClick={() => {
            navigate("/dashboard/settings");
            setOpenProfile(false);
            setOpenSetting(true);
            setIsHistoryOpen(false);
            setTitle("Settings");
            setIsMenuSettingVisible(true);
            setIsEditProfileVisible(false);
            setIsEditBiodataVisible(false);
            setIsPersonalDetailVisible(false);
          }}
        >
          <div className="icon">
            <StandardIcon icon={GearIcon} />
          </div>
        </div>
      </div>
      <div className="content-sidebar">
        {openProfile && (
          <Routes>
            <Route path={`/profile/${username}/*`} element={<UserProfile username={username} />} />
          </Routes>
        )}
        {openSetting && (
          <Routes>
            <Route path="/settings" element={<Settings />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default Index;
