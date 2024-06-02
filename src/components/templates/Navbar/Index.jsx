import React, {useEffect, useState} from "react";
import "./navbar.css";
import TitleIcon from "../../../components/fragments/TitleIcon";
import ProfileNav from "./ProfileNav";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../../../utils/SidebarContext";
import axios from "axios";
import {DefaultPict} from "../../../assets/Image";
import {jwtDecode} from "jwt-decode";

function Index() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const {toggleSidebar, setIsSidebarOpen, isSidebarOpen, setAnimationSidebar, setOpenProfile, setOpenSetting, setIsHistoryOpen, isHistoryOpen} = useSidebar();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    URLPicture: null,
  });

  useEffect(() => {
    if (window.location.pathname === `/dashboard/profile/${decodedToken.username}`) {
      setIsSidebarOpen(true);
      setOpenProfile(true);
      setOpenSetting(false);
    } else if (window.location.pathname === `/dashboard/profile/${decodedToken.username}/history`) {
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
    } else if (window.location.pathname === "/dashboard") {
      setIsSidebarOpen(false);
    }

    const fetchAPI = async () => {
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {username, profilePicture} = responseAPI.data;
        setUserData({
          username: username,
          URLPicture: profilePicture,
        });
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          navigate("/dashboard");
        } else if (error.response.status) {
          if (error.response.status === 401 || error.response.status === 500 || error.response.status === 504) {
            navigate("/dashboard");
          }
        } else {
          alert(error);
        }
      }
    };
    fetchAPI();
  }, [window.location.pathname, setUserData]);

  return (
    <div className="navbar unselectable">
      <TitleIcon
        handleClick={() => {
          if (isSidebarOpen) {
            setOpenProfile(true);
            setOpenSetting(false);
            navigate(`/dashboard/profile/${userData.username}`);
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
        username={decodedToken.username}
        handleClick={() => {
          if (isSidebarOpen) {
            if (!isHistoryOpen) {
              navigate("/dashboard");
            }
          } else {
            if (isHistoryOpen) {
              navigate(`/dashboard/profile/${userData.username}/history`);
            } else {
              navigate(`/dashboard/profile/${userData.username}`);
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
        userPict={userData.URLPicture ? userData.URLPicture : DefaultPict}
      />
    </div>
  );
}

export default Index;
