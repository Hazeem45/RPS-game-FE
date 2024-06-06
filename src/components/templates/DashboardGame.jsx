import React, {useEffect, useState} from "react";
import "./styles/dashboardGame.css";
import GameBox from "../fragments/GameBox";
import LineWithText from "../fragments/LineWithText";
import RoomBox from "../fragments/RoomBox";
import Select from "../elements/Select";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import LoaderSpin from "../fragments/LoaderSpin";

function DashboardGame() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [sortRoom, setSortRoom] = useState("Available");
  const [allRoom, setAllRoom] = useState([]);
  const [availableRoom, setAvailableRoom] = useState([]);
  const [finishedRoom, setFinishedRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAPIGameRoom = async () => {
      setIsLoading(true);
      try {
        const responseAPIallRoom = await axios.get("https://rps-game-be.vercel.app/game/all-rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllRoom(responseAPIallRoom.data);

        const responseAPIavailableRoom = await axios.get("https://rps-game-be.vercel.app/game/available-rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableRoom(responseAPIavailableRoom.data);

        const responseAPIfinishedRoom = await axios.get("https://rps-game-be.vercel.app/game/finished-rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFinishedRoom(responseAPIfinishedRoom.data);
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
    fetchAPIGameRoom();
  }, [setAllRoom, setAvailableRoom, setFinishedRoom]);

  const chooseRoomType = () => {
    if (sortRoom === "Available") {
      return availableRoom;
    } else if (sortRoom === "Finish") {
      return finishedRoom;
    } else {
      return allRoom;
    }
  };

  return (
    <div className="dashboard unselectable">
      <div className="game-bar">
        <GameBox onClick={() => navigate("/versus-com")}>VS COM</GameBox>
        <GameBox onClick={() => navigate("/create-room")}>Create Room</GameBox>
      </div>
      <div style={{padding: "15px", cursor: "default"}}>
        <LineWithText value={`[ ${sortRoom} Rooms ]`} />
      </div>
      <div className="sort-room">
        <Select
          name="type-room"
          options={["Available", "Finish", "All Game"]}
          handleChange={(e) => {
            setSortRoom(e.target.value);
          }}
        />
      </div>
      {chooseRoomType().length > 0 ? (
        <div className="rooms-container">
          {chooseRoomType().map((room) => {
            return <RoomBox key={room.roomId} handleClick={() => navigate(`/versus-player/${room.roomId}`)} roomName={room.roomName} player1={room.player1} player2={room.player2 ? room.player2 : "---"} status={room.roomStatus} />;
          })}
        </div>
      ) : (
        <div className="rooms-container-2">
          {isLoading ? (
            <div style={{width: "100px", height: "100px"}}>
              <LoaderSpin />
            </div>
          ) : (
            <div>
              <h4>{sortRoom} room was not found!</h4>
              {sortRoom === "Available" && <Link to={"/create-room"}>Create New Room</Link>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardGame;
