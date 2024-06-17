import React from 'react';
import './settings.css';
import MenuSettings from './settings/MenuSettings';
import EditProfile from './settings/EditProfile';
import EditBiodata from './settings/EditBiodata';
import PersonalDetail from './settings/PersonalDetail';
import { useSidebar } from '../../../utils/SidebarContext';

function Settings() {
  const { title, setTitle, isMenuSettingVisible, setIsMenuSettingVisible, isEditProfileVisible, setIsEditProfileVisible, isEditBiodataVisible, setIsEditBiodataVisible, isPersonalDetailVisible, setIsPersonalDetailVisible } = useSidebar();

  return (
    <div className='layout-setting unselectable'>
      <div>
        <div
          className={title === 'Settings' ? 'displayNone' : 'setting-back-btn'}
          onClick={() => {
            setTitle('Settings');
            setIsMenuSettingVisible(true);
            setIsEditProfileVisible(false);
            setIsEditBiodataVisible(false);
            setIsPersonalDetailVisible(false);
          }}
        >
          &lt; BACK
        </div>
        <h2>{title}</h2>
      </div>
      {isMenuSettingVisible && (
        <MenuSettings
          handleEditProfile={() => {
            setTitle('Edit Profile');
            setIsMenuSettingVisible(false);
            setIsEditProfileVisible(true);
          }}
          handleEditBiodata={() => {
            setTitle('Edit Biodata');
            setIsMenuSettingVisible(false);
            setIsEditBiodataVisible(true);
          }}
          handlePersonalDetail={() => {
            setTitle('Personal Details');
            setIsMenuSettingVisible(false);
            setIsPersonalDetailVisible(true);
          }}
          handleLogout={() => {
            localStorage.removeItem('accessToken');
            location.reload();
          }}
        />
      )}
      {isEditProfileVisible && <EditProfile />}
      {isEditBiodataVisible && <EditBiodata />}
      {isPersonalDetailVisible && <PersonalDetail />}
    </div>
  );
}

export default Settings;
