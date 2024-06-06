import React, {useEffect, useState} from "react";
import "./styles/gameHistory.css";
import TitlePage from "../fragments/TitlePage";
import {useSidebar} from "../../utils/SidebarContext";
import axios from "axios";
import {getLocaleDate} from "../../utils/formatDate";
import {useNavigate} from "react-router-dom";
import LoaderSpin from "../fragments/LoaderSpin";

function GameHistory({username}) {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {isSidebarOpen, setIsHistoryOpen} = useSidebar();
  const [matches, setMatches] = useState({
    small: window.matchMedia("(max-width: 768px)").matches,
    large: window.matchMedia("(max-width: 995px)").matches,
  });
  const [userHistory, setUserHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAPIuserHistory = async () => {
      setIsLoading(true);
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/game/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserHistory(responseAPI.data);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          navigate("/dashboard");
        } else if (error.response.status) {
          if (error.response.status === 401 || error.response.status === 500 || error.response.status === 504) {
            navigate("/dashboard");
          }
        } else {
          alert(error);
        }
      }
      setIsLoading(false);
    };
    fetchAPIuserHistory();

    const smallHandler = (e) => setMatches((prevState) => ({...prevState, small: e.matches}));
    const largeHandler = (e) => setMatches((prevState) => ({...prevState, large: e.matches}));

    const smallMediaQuery = window.matchMedia("(max-width: 768px)");
    const largeMediaQuery = window.matchMedia("(max-width: 995px)");

    smallMediaQuery.addEventListener("change", smallHandler);
    largeMediaQuery.addEventListener("change", largeHandler);
    return () => {
      smallMediaQuery.removeEventListener("change", smallHandler);
      largeMediaQuery.removeEventListener("change", largeHandler);
    };
  }, []);

  return (
    <div className="table-wrapper">
      <TitlePage classForTitle={isSidebarOpen && matches.small ? "displayNone" : ""}>{isSidebarOpen || matches.small ? "" : username} Game History</TitlePage>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Result</th>
            <th>Date</th>
            <th className={isSidebarOpen && matches.large ? "displayNone" : "time-column"}>Time</th>
          </tr>
        </thead>
        <tbody>
          {userHistory.map((game) => (
            <tr key={game.roomId} onClick={() => navigate(`/versus-player/${game.roomId}`)}>
              <td>{game.roomName}</td>
              <td className={game.result.toLowerCase()}>{game.result}</td>
              <td>{getLocaleDate(game.date).date}</td>
              <td className={isSidebarOpen && matches.large ? "displayNone" : "time-column"}>
                {`${getLocaleDate(game.date).time} 
                ${getLocaleDate(game.date).timeZone}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userHistory.length < 1 && (
        <div className="rooms-container-2">
          {isLoading ? (
            <div style={{width: "100px", height: "100px"}}>
              <LoaderSpin />
            </div>
          ) : (
            <div style={{display: "flex", alignItems: "center", marginTop: "-50px", fontSize: "18px"}}>
              <div>
                You don't have a game history yet. return to the{" "}
                <div
                  style={{display: "inline", color: "orangered", textDecoration: "orangered underline", cursor: "pointer"}}
                  onClick={() => {
                    setIsHistoryOpen(false);
                    if (isSidebarOpen) {
                      navigate(`/dashboard/profile`);
                    } else {
                      navigate("/dashboard");
                    }
                  }}
                >
                  Dashboard
                </div>{" "}
                to play
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameHistory;
