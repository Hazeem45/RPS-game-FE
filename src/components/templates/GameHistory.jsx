import React from "react";
import "./styles/gameHistory.css";
import TitlePage from "../fragments/TitlePage";

function GameHistory() {
  const userHistory = [
    {
      id: 1,
      roomName: "Zeeeber",
      result: "WIN",
      date: "12 January 2024",
      time: "18:00",
    },
    {
      id: 2,
      roomName: "F22Raptor",
      result: "LOSE",
      date: "31 February 2024",
      time: "17:00",
    },
    {
      id: 3,
      roomName: "XtraX",
      result: "DRAW",
      date: "07 April 2024",
      time: "14:00",
    },
    {
      id: 4,
      roomName: "Wengdev",
      result: "WIN",
      date: "12 May 2024",
      time: "08:00",
    },
    {
      id: 5,
      roomName: "Re:born",
      result: "WIN",
      date: "02 July 2024",
      time: "17:45",
    },
  ];
  const sortedUserHistory = userHistory.slice().sort((a, b) => b.id - a.id);

  return (
    <div className="table-wrapper">
      <table className="styled-table">
        <caption>
          <TitlePage>Game History</TitlePage>
        </caption>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Result</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Membuat baris tabel menggunakan pengulangan map */}
          {sortedUserHistory.map((game) => (
            <tr key={game.id} onClick={() => alert(`you will be navigated to room => ${game.roomName}`)}>
              <td>{game.roomName}</td>
              <td className={game.result.toLowerCase()}>{game.result}</td>
              <td>{game.date}</td>
              <td>{game.time} UTC+7</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameHistory;
