import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import AlertMessage from "../components/fragments/AlertMessage";
import {DefaultPict} from "../assets/Image";

const UserProfileContext = createContext();
export const useProfile = () => useContext(UserProfileContext);

export const ProfileProvider = ({children}) => {
  const token = localStorage.getItem("accessToken");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButton, setAlertButton] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const errorName = alertTitle.split(" ");
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
        console.log(responseAPIBiodata.data);
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
        console.error(error);
        if (error.code === "ERR_NETWORK") {
          setAlertTitle(`${error.message}`);
          setAlertMessage("Try refresh the page or contact the developer");
          setIsAlertVisible(true);
          setAlertButton("RELOAD");
        } else if (error.response.status) {
          if (error.response.status === 401) {
            setAlertTitle(`${error.response.data.name} ( ${error.response.data.message} )`);
            setAlertMessage("Please relog to continue using the app");
            setAlertButton("RELOG");
          } else if (error.response.status === 500) {
            setAlertTitle(`${error.response.statusText}`);
            setAlertMessage("Try to reload the page or contact the developer");
            setAlertButton("RELOAD");
          } else if (error.response.status === 504) {
            setAlertTitle(`${error.message}`);
            setAlertMessage("Try to reload the page or contact the developer");
            setAlertButton("RELOAD");
          } else {
            alert(error);
          }
          setIsAlertVisible(true);
        } else {
          alert(error);
        }
      }
    };
    if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      fetchAPI();
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{userData, setUserData}}>
      {isAlertVisible && (
        <AlertMessage
          title={alertTitle}
          handleButton={() => {
            if (errorName[0] === "TokenExpiredError" || errorName[0] === "JsonWebTokenError") {
              localStorage.removeItem("accessToken");
              location.reload();
            } else {
              location.reload();
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
