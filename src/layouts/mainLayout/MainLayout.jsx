import React, {useState} from "react";
import "./mainLayout.css";
import Sidebar from "../../components/templates/Sidebar/Index";
import Navbar from "../../components/templates/Navbar/Index";

function MainLayout({children}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClick = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar handleClick={handleClick} />
      <div className="content">
        <div className={`sidebar-wrap ${openSidebar ? "" : "displayNone"} `}>
          <Sidebar status={openSidebar ? "open" : "close"} />
        </div>
        <div className="child-wrap">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
