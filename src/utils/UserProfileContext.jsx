import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import AlertMessage from "../components/fragments/AlertMessage";
import {DefaultPict} from "../assets/Image";
import {errorHandler} from "./errorHandler";

const UserProfileContext = createContext();
export const useProfile = () => useContext(UserProfileContext);

export const ProfileProvider = ({children}) => {
  const token = localStorage.getItem("accessToken");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButton, setAlertButton] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: null,
    firstname: null,
    lastname: null,
    address: null,
    gender: null,
    birthDate: null,
    infoBio: null,
    joinDate: null,
    pictureURL: null,
  });

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const responseAPIBiodata = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {username, firstName, lastName, address, gender, birthDate, info, joinAt, profilePicture} = responseAPIBiodata.data;
        setUserData({
          username,
          firstname: firstName !== null ? firstName : username,
          lastname: lastName,
          address,
          gender: gender !== null ? gender : "",
          birthDate,
          infoBio: info,
          joinDate: joinAt,
          pictureURL: profilePicture ? profilePicture : DefaultPict,
        });
      } catch (error) {
        setIsAlertVisible(true);
        setAlertTitle(errorHandler(error).alertTitle);
        setAlertMessage(errorHandler(error).alertMessage);
        setAlertButton(errorHandler(error).alertButton);
      }
    };
    if (window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      fetchAPI();
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{userData, setUserData, setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible}}>
      {isAlertVisible && (
        <AlertMessage
          title={alertTitle}
          handleButton={() => {
            if (alertButton === "RELOG") {
              localStorage.removeItem("accessToken");
              location.reload();
            } else if (alertButton === "RELOAD") {
              location.reload();
            } else if (alertButton === "CLOSE") {
              setIsAlertVisible(false);
            }
          }}
          butonText={alertButton}
        >
          {alertMessage}
        </AlertMessage>
      )}
      {children}
    </UserProfileContext.Provider>
  );
};
