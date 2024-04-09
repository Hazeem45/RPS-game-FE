import React, {useState} from "react";
import StandardIcon from "../../../fragments/StandardIcon";
import {EditIcon, FileIcon, LogoutIcon, UserEditIcon} from "../../../../assets/Image";
import Popover from "../../../fragments/Popover";

function MenuSettings({handleEditProfile, handleEditBiodata, handlePersonalDetail, handleLogout}) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <div className="menu-setting">
      <div className="list" onClick={handleEditProfile}>
        <div className="icon">
          <StandardIcon icon={UserEditIcon} />
        </div>
        <h4>Edit Profile</h4>
      </div>
      <div className="list" onClick={handleEditBiodata}>
        <div className="icon">
          <StandardIcon icon={EditIcon} />
        </div>
        <h4>Edit Biodata</h4>
      </div>
      <div className="list" onClick={handlePersonalDetail}>
        <div className="icon">
          <StandardIcon icon={FileIcon} />
        </div>
        <h4>Personal Details</h4>
      </div>
      <div className="list" onClick={() => setIsPopoverVisible(true)}>
        {isPopoverVisible && (
          <Popover
            title="Sign Out?"
            child1="Continue"
            handleClickChild1={handleLogout}
            handleClose={(e) => {
              e.stopPropagation();
              setIsPopoverVisible(false);
            }}
          />
        )}
        <div className="icon">
          <StandardIcon icon={LogoutIcon} />
        </div>
        <h4>Logout</h4>
      </div>
    </div>
  );
}

export default MenuSettings;
