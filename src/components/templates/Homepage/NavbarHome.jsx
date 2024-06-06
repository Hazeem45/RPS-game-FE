import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Image from "../../elements/Image";
import {UserIcon} from "../../../assets/Image";

function NavbarHome({accessToken}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({behavior: "smooth"});
  };

  return (
    <div className="navigationbar-section">
      {/* <!-- navbar / main menu --> */}
      <nav className="navbar-home">
        <div className="container">
          <div className="logo" onClick={() => scrollToSection("main-page")}>
            Logo
          </div>
          <div className={`nav-menu ${showMenu ? "active" : ""}`}>
            <ul className="main-menu">
              <li onClick={() => scrollToSection("about-game")}>About</li>
              <li onClick={() => scrollToSection("features")}>Features</li>
              <li onClick={() => scrollToSection("requirements")}>Requirement</li>
              <li onClick={() => scrollToSection("quotes")}>Quotes</li>
            </ul>
            <ul className="authentication-menu">
              <li className={accessToken ? "displayNone" : ""} onClick={() => navigate("/register")}>
                register
              </li>
              <li
                onClick={() => {
                  accessToken ? navigate(`/dashboard/profile`) : navigate("/login");
                }}
              >
                {accessToken && <Image src={UserIcon} />}
                {accessToken ? "profile" : "login"}
              </li>
            </ul>
          </div>
          <div className={`menu-toggle ${showMenu ? "toggle-active" : ""}`} onClick={() => toggleMenu()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarHome;
