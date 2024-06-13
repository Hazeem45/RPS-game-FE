import React, {useEffect, useState} from "react";
import "./mainLayout.css";
import Sidebar from "../../components/templates/Sidebar/Index";
import Navbar from "../../components/templates/Navbar/Index";
import {useSidebar} from "../../utils/SidebarContext";
import Image from "../../components/elements/Image";
import {DefaultPict} from "../../assets/Image";
import {useProfile} from "../../utils/UserProfileContext";
import {useNavigate} from "react-router-dom";

function MainLayout({children}) {
  const {isSidebarOpen, viewImage, setViewImage, setIsSidebarOpen, setOpenProfile, setOpenSearchBar, openSearchBar, setOpenSetting, setIsHistoryOpen, toggleSidebar, isHistoryOpen} = useSidebar();
  const {userData, visitedPicture, setVisitedPicture} = useProfile();
  const navigate = useNavigate();
  const [matches, setMatches] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    if (window.location.pathname === `/dashboard/profile`) {
      setIsSidebarOpen(true);
      setOpenProfile(true);
      setOpenSetting(false);
      setOpenSearchBar(false);
    } else if (window.location.pathname === `/dashboard/profile/history`) {
      setOpenProfile(true);
      setIsHistoryOpen(true);
      setOpenSetting(false);
      setOpenSearchBar(false);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    } else if (window.location.pathname === "/dashboard/settings") {
      setIsSidebarOpen(true);
      setIsHistoryOpen(false);
      setOpenProfile(false);
      setOpenSearchBar(false);
      setOpenSetting(true);
    } else if (window.location.pathname === "/dashboard/search") {
      setIsSidebarOpen(true);
      setIsHistoryOpen(false);
      setOpenProfile(false);
      setOpenSearchBar(true);
      setOpenSetting(false);
    } else if (window.location.pathname === "/dashboard") {
      setIsSidebarOpen(false);
      setOpenProfile(false);
      setOpenSetting(false);
      setIsHistoryOpen(false);
      setOpenSearchBar(false);
    }

    const handler = (e) => setMatches(e.matches);
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [window.location.pathname]);

  return (
    <div className="main-layout" style={{overflow: isSidebarOpen && matches ? "hidden" : ""}}>
      <Navbar
        handleClickIconGame={() => {
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
        handleClickIconProfile={() => {
          if (
            location.pathname === "/dashboard" ||
            location.pathname === `/dashboard/profile` ||
            location.pathname === `/dashboard/profile/history` ||
            location.pathname === `/dashboard/search` ||
            location.pathname === `/dashboard/settings`
          ) {
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
          }
        }}
      />
      <div className="content">
        <div className={`sidebar-wrap ${isSidebarOpen ? "" : "displayNone"}`}>
          <Sidebar status={isSidebarOpen ? "open" : "close"} />
        </div>
        <div className={`child-wrap`}>{children}</div>
        {viewImage && (
          <div className="picture-full" onClick={() => setViewImage(false)}>
            <div
              className="view-picture"
              onClick={(e) => {
                e.stopPropagation();
                setViewImage(true);
              }}
            >
              <Image classImg="center-img" src={location.pathname === "/dashboard/profile" || location.pathname === "/dashboard/profile/history" ? userData.pictureURL : visitedPicture} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
