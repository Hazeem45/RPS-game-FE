import React, {useEffect} from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";

function Index() {
  const {toggleSidebar, setIsSidebarOpen, isSidebarOpen, setAnimationSidebar, setOpenProfile, setOpenSetting, setIsHistoryOpen, isHistoryOpen} = useSidebar();
  const navigate = useNavigate();
  const userPict = localStorage.getItem("foto");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (window.location.pathname === `/dashboard/profile/${username}`) {
      setIsSidebarOpen(true);
      setOpenProfile(true);
      setOpenSetting(false);
    } else if (window.location.pathname === `/dashboard/profile/${username}/history`) {
      setOpenProfile(true);
      setIsHistoryOpen(true);
      setOpenSetting(false);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    } else if (window.location.pathname === "/dashboard/settings") {
      setIsSidebarOpen(true);
      setIsHistoryOpen(false);
      setOpenProfile(false);
      setOpenSetting(true);
    }
  }, [window.location.pathname]);

  return (
    <div className="navbar unselectable">
      <TitleIcon
        handleClick={() => {
          if (isSidebarOpen) {
            setOpenProfile(true);
            setOpenSetting(false);
            navigate(`/dashboard/profile/${username}`);
          } else {
            navigate("/dashboard");
          }
          setAnimationSidebar("");
          setIsHistoryOpen(false);
          if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
          }
        }}
      />
      <ProfileNav
        username={username}
        handleClick={() => {
          if (isSidebarOpen) {
            if (!isHistoryOpen) {
              navigate("/dashboard");
            }
          } else {
            if (isHistoryOpen) {
              navigate(`/dashboard/profile/${username}/history`);
            } else {
              navigate(`/dashboard/profile/${username}`);
            }
          }
          toggleSidebar();
          if (isSidebarOpen) {
          }
          if (window.innerWidth > 768) {
            setAnimationSidebar("open-from-left");
          } else {
            setAnimationSidebar("open-from-above");
          }
        }}
        userPict={userPict}
      />
    </div>
  );
}

export default Index;
