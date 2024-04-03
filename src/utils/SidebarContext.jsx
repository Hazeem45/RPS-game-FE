import React, {createContext, useContext, useState} from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);
export const SidebarProvider = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animationSidebar, setAnimationSidebar] = useState("");
  const [openProfile, setOpenProfile] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        animationSidebar,
        setAnimationSidebar,
        openProfile,
        setOpenProfile,
        openSetting,
        setOpenSetting,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
