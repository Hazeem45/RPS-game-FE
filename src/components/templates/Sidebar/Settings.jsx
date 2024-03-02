import React from "react";
import "./settings.css";
import StandardIcon from "../../fragments/StandardIcon";
import EditProfile from "../../../assets/image/user-avatar.png";
import Edit from "../../../assets/image/edit.png";
import UserDetail from "../../../assets/image/file.png";

function Settings() {
  return (
    <div className="unselectable">
      <h2>Settings</h2>
      <div className="menu-setting">
        <div className="list">
          <div className="icon">
            <StandardIcon icon={EditProfile} />
          </div>
          <h4>Edit Profile</h4>
        </div>
        <div className="list">
          <div className="icon">
            <StandardIcon icon={Edit} />
          </div>
          <h4>Edit Biodata</h4>
        </div>
        <div className="list">
          <div className="icon">
            <StandardIcon icon={UserDetail} />
          </div>
          <h4>Personal Details</h4>
        </div>
      </div>
    </div>
  );
}

export default Settings;
