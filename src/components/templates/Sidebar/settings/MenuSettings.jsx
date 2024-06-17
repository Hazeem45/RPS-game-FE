import React, { useState } from 'react';
import StandardIcon from '../../../fragments/StandardIcon';
import { EditIcon, FileIcon, HomeIcon, LogoutIcon, UserEditIcon } from '../../../../assets/Image';
import Popover from '../../../fragments/Popover';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuSettings({ handleEditProfile, handleEditBiodata, handlePersonalDetail, handleLogout }) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='menu-setting'>
      <div className='list' onClick={handleEditProfile}>
        <div className='icon'>
          <StandardIcon icon={UserEditIcon} />
        </div>
        <h4>Edit Profile</h4>
      </div>
      <div className='list' onClick={handleEditBiodata}>
        <div className='icon'>
          <StandardIcon icon={EditIcon} />
        </div>
        <h4>Edit Biodata</h4>
      </div>
      <div className='list' onClick={handlePersonalDetail}>
        <div className='icon'>
          <StandardIcon icon={FileIcon} />
        </div>
        <h4>Personal Details</h4>
      </div>
      <div className='list' onClick={() => navigate('/')}>
        <div className='icon'>
          <StandardIcon icon={HomeIcon} />
        </div>
        <h4>Homepage</h4>
      </div>
      <div className='list' onClick={() => setIsPopoverVisible(true)}>
        {isPopoverVisible && (
          <Popover
            title='Sign Out?'
            child1='Continue'
            handleClickChild1={handleLogout}
            handleClose={(e) => {
              e.stopPropagation();
              setIsPopoverVisible(false);
            }}
          />
        )}
        <div className='icon'>
          <StandardIcon icon={LogoutIcon} />
        </div>
        <h4>Logout</h4>
      </div>
    </div>
  );
}

MenuSettings.propTypes = {
  handleEditProfile: PropTypes.func.isRequired,
  handleEditBiodata: PropTypes.func.isRequired,
  handlePersonalDetail: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default MenuSettings;
