import React, {useEffect} from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";
import {useProfile} from "../../../utils/UserProfileContext";
import LoaderSpin from "../../fragments/LoaderSpin";

function Index() {
  const {userData} = useProfile();
  const {toggleSidebar, setIsSidebarOpen, isSidebarOpen, setOpenProfile, setOpenSetting, setIsHistoryOpen, isHistoryOpen} = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="navbar unselectable">
      <TitleIcon
        handleClick={() => {
          if (isSidebarOpen) {
            setOpenProfile(true);
            setOpenSetting(false);
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
      {userData.pictureURL ? (
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
      ) : (
        <div style={{display: "flex", alignItems: "center", position: "relative", gap: "10px", color: "wheat", height: "50px", cursor: "default"}}>
          <h3>loading...</h3>
          <div style={{background: "lightgrey", borderRadius: "50%", width: "3rem", height: "3rem"}}>
            <LoaderSpin customLoader={{border: "4px solid black"}} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
