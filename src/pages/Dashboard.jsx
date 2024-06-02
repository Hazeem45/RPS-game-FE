import React, {useEffect, useState} from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import DashboardGame from "../components/templates/DashboardGame";
import GameHistory from "../components/templates/GameHistory";
import {useSidebar} from "../utils/SidebarContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import AlertMessage from "../components/fragments/AlertMessage";

function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {isHistoryOpen} = useSidebar();
  const [username, setUsername] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButton, setAlertButton] = useState("");
  const [isAlertShow, setIsAlertShow] = useState(false);
  const errorName = alertTitle.split(" ");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {username} = responseAPI.data;
        setUsername(username);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          setAlertTitle(`${error.message}`);
          setAlertMessage("Try refresh the page or contact the developer");
          setIsAlertShow(true);
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
          setIsAlertShow(true);
        } else {
          alert(error);
        }
      }
    };
    fetchAPI();
  }, [window.location.pathname, setUsername]);

  return (
    <MainLayout>
      {isAlertShow && (
        <AlertMessage
          title={alertTitle}
          handleButton={() => {
            if (errorName[0] === "TokenExpiredError" || errorName[0] === "JsonWebTokenError") {
              localStorage.removeItem("accessToken");
              navigate("/login");
            } else {
              location.reload();
            }
          }}
          butonText={alertButton}
        >
          {alertMessage}
        </AlertMessage>
      )}
      {isHistoryOpen ? (
        <Routes>
          <Route path={`/profile/${username}/history`} element={<GameHistory username={username} />} />
        </Routes>
      ) : (
        <DashboardGame />
      )}
    </MainLayout>
  );
}

export default Dashboard;
