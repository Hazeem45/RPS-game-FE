import React, {useEffect, useState} from "react";
import "./mainLayout.css";
import Sidebar from "../../components/templates/Sidebar/Index";
import Navbar from "../../components/templates/Navbar/Index";
import {useSidebar} from "../../utils/SidebarContext";
import Image from "../../components/elements/Image";
import {DefaultPict} from "../../assets/Image";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MainLayout({children}) {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {isSidebarOpen, viewImage, setViewImage} = useSidebar();
  const [matches, setMatches] = useState(window.matchMedia("(max-width: 768px)").matches);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {profilePicture} = responseAPI.data;
        setPicture(profilePicture);
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
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [window.location.pathname, setPicture]);

  return (
    <div className="main-layout" style={{overflow: isSidebarOpen && matches ? "hidden" : ""}}>
      <Navbar />
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
              <Image classImg="center-img" src={picture ? picture : DefaultPict} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
