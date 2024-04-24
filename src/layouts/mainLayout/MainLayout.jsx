import React, {useEffect, useState} from "react";
import "./mainLayout.css";
import Sidebar from "../../components/templates/Sidebar/Index";
import Navbar from "../../components/templates/Navbar/Index";
import {useSidebar} from "../../utils/SidebarContext";
import Image from "../../components/elements/Image";
import {DefaultPict} from "../../assets/Image";

function MainLayout({children}) {
  const {isSidebarOpen, viewImage, setViewImage} = useSidebar();
  const [matches, setMatches] = useState(window.matchMedia("(max-width: 768px)").matches);
  const userPict = localStorage.getItem("foto");

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
              <Image classImg="center-img" src={userPict === "null" || userPict === null ? DefaultPict : userPict} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
