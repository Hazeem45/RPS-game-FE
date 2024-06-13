import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./sidebar.css";
import ProfileIcon from "../../../components/fragments/ProfileIcon";
import StandardIcon from "../../../components/fragments/StandardIcon";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import {DefaultPict, GearIcon, SearchUserIcon} from "../../../assets/Image";
import {useSidebar} from "../../../utils/SidebarContext";
import {useNavigate} from "react-router-dom";
import UserSearch from "./UserSearch";

function Index() {
  const navigate = useNavigate();
  const {
    openProfile,
    setOpenProfile,
    openSetting,
    setOpenSetting,
    setOpenSearchBar,
    openSearchBar,
    setTitle,
    setIsMenuSettingVisible,
    setIsEditProfileVisible,
    setIsEditBiodataVisible,
    setIsPersonalDetailVisible,
    setIsHistoryOpen,
    isHistoryOpen,
  } = useSidebar();
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 500px)").matches);

  const backgroundColor = () => {
    if (matches) {
      return "rgba(128, 128, 128, 0.5)";
    } else {
      return "rgb(36, 37, 38)";
    }
  };

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    const mediaQuery = window.matchMedia("(min-width: 500px)");
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [window.location.pathname]);

  return (
    <div className={`sidebar unselectable ${window.innerWidth > 768 ? "open-from-left" : ""}`}>
      <div className="option-sidebar">
        <div
          style={{backgroundColor: openProfile ? backgroundColor() : ""}}
          className="profile"
          onClick={() => {
            setOpenProfile(true);
            setOpenSearchBar(false);
            setOpenSetting(false);
            navigate(isHistoryOpen ? `/dashboard/profile/history` : `/dashboard/profile`);
          }}
        >
          <div className="icon">
            <ProfileIcon userPict={DefaultPict} />
          </div>
        </div>
        <div
          style={{backgroundColor: openSearchBar ? backgroundColor() : ""}}
          className="search"
          onClick={() => {
            navigate("/dashboard/search");
            setOpenProfile(false);
            setOpenSetting(false);
            setIsHistoryOpen(false);
            setOpenSearchBar(true);
          }}
        >
          <div className="icon">
            <StandardIcon icon={SearchUserIcon} />
          </div>
        </div>
        <div
          style={{backgroundColor: openSetting ? backgroundColor() : ""}}
          className="setting"
          onClick={() => {
            navigate("/dashboard/settings");
            setOpenProfile(false);
            setOpenSearchBar(false);
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
      {(location.pathname === `/dashboard/profile` || location.pathname === `/dashboard/profile/history` || location.pathname === `/dashboard/search` || location.pathname === `/dashboard/settings`) && (
        <div className="content-sidebar">
          {openProfile && (
            <Routes>
              <Route path={`/profile/*`} element={<UserProfile />} />
            </Routes>
          )}
          {openSearchBar && (
            <Routes>
              <Route path="/search" element={<UserSearch />} />
            </Routes>
          )}
          {openSetting && (
            <Routes>
              <Route path="/settings" element={<Settings />} />
            </Routes>
          )}
        </div>
      )}
    </div>
  );
}

export default Index;
