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
import axios from "axios";

function Index() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {animationSidebar, openProfile, setOpenProfile, openSetting, setOpenSetting, setTitle, setIsMenuSettingVisible, setIsEditProfileVisible, setIsEditBiodataVisible, setIsPersonalDetailVisible, setIsHistoryOpen, isHistoryOpen} =
    useSidebar();
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 500px)").matches);
  const [userData, setUserData] = useState({
    username: "",
    URLPicture: null,
    firstName: null,
    lastName: null,
    info: null,
    address: null,
    gender: null,
    birthDate: null,
    joinDate: null,
  });

  const backgroundColor = () => {
    if (matches) {
      return "gray";
    } else {
      return "rgb(36, 37, 38)";
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {username, profilePicture, firstName, lastName, info, address, gender, birthDate, joinDate} = responseAPI.data;
        setUserData({
          username: username,
          URLPicture: profilePicture,
          firstName: firstName,
          lastName: lastName,
          info: info,
          address: address,
          gender: gender,
          birthDate: birthDate,
          joinDate: joinDate,
        });
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          navigate("/dashboard");
        } else if (error.response.status) {
          if (error.response.status === 401 || error.response.status === 500) {
            navigate("/dashboard");
          }
        } else {
          alert(error);
        }
      }
    };
    fetchAPI();

    const handler = (e) => setMatches(e.matches);
    const mediaQuery = window.matchMedia("(min-width: 500px)");
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [window.location.pathname, setUserData]);

  return (
    <div className={`sidebar unselectable ${animationSidebar}`}>
      <div className="option-sidebar">
        <div
          style={{background: openProfile ? backgroundColor() : ""}}
          className="profile"
          onClick={() => {
            setOpenProfile(true);
            setOpenSetting(false);
            navigate(isHistoryOpen ? `/dashboard/profile/${userData.username}/history` : `/dashboard/profile/${userData.username}`);
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
            <Route
              path={`/profile/${userData.username}/*`}
              element={
                <UserProfile
                  username={userData.username}
                  picture={userData.URLPicture}
                  fullname={`${userData.firstName} ${userData.lastName}`}
                  userBio={userData.info}
                  address={userData.address}
                  gender={userData.gender}
                  birthday={userData.birthDate}
                  join={userData.joinDate}
                />
              }
            />
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
