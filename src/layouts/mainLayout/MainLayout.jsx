import React, {useState} from "react";
import "./mainLayout.css";
import Sidebar from "../../components/templates/Sidebar/Index";
import Navbar from "../../components/templates/Navbar/Index";
import {SidebarProvider, useSidebar} from "../../utils/SidebarContext";

function MainLayout({children}) {
  const {isSidebarOpen} = useSidebar();

  return (
    <div>
      <Navbar />
      <div className="content">
        <div className={`sidebar-wrap ${isSidebarOpen ? "" : "displayNone"} `}>
          <Sidebar status={isSidebarOpen ? "open" : "close"} />
        </div>
        <div className="child-wrap">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
