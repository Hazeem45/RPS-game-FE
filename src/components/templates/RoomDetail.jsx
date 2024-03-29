import React from "react";
import "./styles/roomDetail.css";
import ListOfChoices from "../fragments/ListOfChoices";
import Image from "../elements/Image";
import {FightIcon, RefreshIcon} from "../../assets/Image";
import ResultBox from "../fragments/ResultBox";

function RoomDetail({
  player1,
  player2,
  styleRock,
  stylePaper,
  styleScissors,
  gameType,
  onMouseEnter,
  onMouseLeave,
  onClick,
  rockSelectedP1,
  rockSelectedP2,
  paperSelectedP1,
  paperSelectedP2,
  scissorsSelectedP1,
  scissorsSelectedP2,
  handleRefresh,
  result,
}) {
  return (
    <div className="room-detail unselectable">
      <ListOfChoices
        username={player1}
        classForRock={gameType === "vs-com" || gameType === "vs-player" ? rockSelectedP1 : ""}
        classForPaper={gameType === "vs-com" || gameType === "vs-player" ? paperSelectedP1 : ""}
        classForScissors={gameType === "vs-com" || gameType === "vs-player" ? scissorsSelectedP1 : ""}
        styleRock={gameType === "vs-com" ? styleRock : {}}
        stylePaper={gameType === "vs-com" ? stylePaper : {}}
        styleScissors={gameType === "vs-com" ? styleScissors : {}}
        onRock={gameType === "vs-com" ? onMouseEnter : null}
        onPaper={gameType === "vs-com" ? onMouseEnter : null}
        onScissors={gameType === "vs-com" ? onMouseEnter : null}
        onMouseLeave={gameType === "vs-com" ? onMouseLeave : null}
        onClick={gameType === "vs-com" ? onClick : null}
      />

      <div className="versus-img">{result === "" ? <Image src={FightIcon} /> : <ResultBox result={result} />}</div>
      <div className="refresh-img" onClick={handleRefresh}>
        <Image src={RefreshIcon} />
      </div>

      <ListOfChoices
        username={player2}
        classForRock={gameType === "vs-player" || gameType === "vs-com" ? rockSelectedP2 : ""}
        classForPaper={gameType === "vs-player" || gameType === "vs-com" ? paperSelectedP2 : ""}
        classForScissors={gameType === "vs-player" || gameType === "vs-com" ? scissorsSelectedP2 : ""}
        styleRock={gameType === "vs-player" ? styleRock : {}}
        stylePaper={gameType === "vs-player" ? stylePaper : {}}
        styleScissors={gameType === "vs-player" ? styleScissors : {}}
        onRock={gameType === "vs-player" ? onMouseEnter : null}
        onPaper={gameType === "vs-player" ? onMouseEnter : null}
        onScissors={gameType === "vs-player" ? onMouseEnter : null}
        onMouseEnter={gameType === "vs-player" ? onMouseEnter : null}
        onMouseLeave={gameType === "vs-player" ? onMouseLeave : null}
        onClick={gameType === "vs-player" ? onClick : null}
      />
    </div>
  );
}

export default RoomDetail;
