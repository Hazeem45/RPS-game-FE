import React, {useState} from "react";
import "./styles/dashboardGame.css";
import GameBox from "../fragments/GameBox";
import LineWithText from "../fragments/LineWithText";
import RoomBox from "../fragments/RoomBox";
import Select from "../elements/Select";
import {useNavigate} from "react-router-dom";

function DashboardGame() {
  const navigate = useNavigate();
  const [sortRoom, setSortRoom] = useState("Available");
  const [room, setRoom] = useState([
    {
      roomId: 1,
      roomName: "the One",
      player1: "makmur",
      player2: "warmad",
      status: "Finished",
    },
    {
      roomId: 2,
      roomName: "Veler",
      player1: "makmur",
      player2: "warmad",
      status: "Finished",
    },
    {
      roomId: 3,
      roomName: "Game Room",
      player1: "warmad",
      player2: "--",
      status: "Available",
    },
    {
      roomId: 4,
      roomName: "Ikan Lele",
      player1: "mirzaXriot",
      player2: "kholilGaming",
      status: "Finished",
    },
    {
      roomId: 5,
      roomName: "Nopo Bener",
      player1: "D'xagree",
      player2: "--",
      status: "Available",
    },
    {
      roomId: 6,
      roomName: "Clasher",
      player1: "swagger",
      player2: "--",
      status: "Available",
    },
    {
      roomId: 7,
      roomName: "Wengdev",
      player1: "rjs_",
      player2: "--",
      status: "Available",
    },
    {
      roomId: 8,
      roomName: "Khilma",
      player1: "balikan",
      player2: "move-on",
      status: "Finished",
    },
    {
      roomId: 9,
      roomName: "tulung",
      player1: "No-Mercy",
      player2: "Forget.it",
      status: "Finished",
    },
    {
      roomId: 10,
      roomName: "PEJATEN",
      player1: "mang_eak",
      player2: "zeeeb",
      status: "Finished",
    },
    {
      roomId: 11,
      roomName: "SCP 999",
      player1: "afh.imyh",
      player2: "l3l3",
      status: "Finished",
    },
    {
      roomId: 12,
      roomName: "Raptor",
      player1: "mang_eak",
      player2: "--",
      status: "Available",
    },
  ]);

  return (
    <div className="unselectable">
      <div className="game">
        <GameBox onClick={() => navigate("/versus-com")}>VS COM</GameBox>
        <GameBox onClick={() => navigate("/create-room")}>Create Room</GameBox>
      </div>
      <div style={{padding: "15px", cursor: "default"}}>
        <LineWithText value={`[ ${sortRoom} Rooms ]`} />
      </div>
      <div className="sort-room">
        <Select
          name="type-room"
          options={["Available", "Finished", "All Game"]}
          handleChange={(e) => {
            setSortRoom(e.target.value);
          }}
        />
      </div>
      <div className="game-rooms">
        {room
          .filter((room) => {
            if (sortRoom === "All Game") {
              return true;
            } else {
              return room.status === sortRoom;
            }
          })
          .map((room) => {
            return (
              <RoomBox
                key={room.roomId}
                roomName={room.roomName}
                player1={room.player1}
                player2={room.player2}
                status={room.status}
                handleClick={() => {
                  alert(`you will be navigated to room => ${room.roomName}`);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default DashboardGame;
