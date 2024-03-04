import React from "react";
import "./settings.css";
import StandardIcon from "../../fragments/StandardIcon";
import {EditIcon, FileIcon, UserEditIcon} from "../../../assets/Image";

function Settings() {
  return (
    <div className="unselectable">
      <h2>Settings</h2>
      <div className="menu-setting">
        <div className="list">
          <div className="icon">
            <StandardIcon icon={UserEditIcon} />
          </div>
          <h4>Edit Profile</h4>
        </div>
        <div className="list">
          <div className="icon">
            <StandardIcon icon={EditIcon} />
          </div>
          <h4>Edit Biodata</h4>
        </div>
        <div className="list">
          <div className="icon">
            <StandardIcon icon={FileIcon} />
          </div>
          <h4>Personal Details</h4>
        </div>
      </div>
    </div>
  );
}

export default Settings;
