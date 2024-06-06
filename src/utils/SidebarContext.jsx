import React, {createContext, useContext, useState} from "react";

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(true);
  const [viewImage, setViewImage] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [title, setTitle] = useState("Settings");
  const [isMenuSettingVisible, setIsMenuSettingVisible] = useState(true);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isEditBiodataVisible, setIsEditBiodataVisible] = useState(false);
  const [isPersonalDetailVisible, setIsPersonalDetailVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        openProfile,
        setOpenProfile,
        openSetting,
        setOpenSetting,
        title,
        setTitle,
        isMenuSettingVisible,
        setIsMenuSettingVisible,
        isEditProfileVisible,
        setIsEditProfileVisible,
        isEditBiodataVisible,
        setIsEditBiodataVisible,
        isPersonalDetailVisible,
        setIsPersonalDetailVisible,
        viewImage,
        setViewImage,
        isHistoryOpen,
        setIsHistoryOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
