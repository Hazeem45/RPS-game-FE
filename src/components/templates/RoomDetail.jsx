import React from "react";
import "./styles/roomDetail.css";
import ListOfChoices from "../fragments/ListOfChoices";
import Image from "../elements/Image";
import {FightIcon, RefreshIcon} from "../../assets/Image";
import ResultBox from "../fragments/ResultBox";
import TitlePage from "../fragments/TitlePage";
import Popup from "../fragments/Popup";
import LoaderSpin from "../fragments/LoaderSpin";

function RoomDetail({
  title,
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
  popupVisible,
  popupValue,
  handleClosePopup,
  loading,
}) {
  return (
    <div className="room-detail unselectable">
      <TitlePage>{title}</TitlePage>
      <ListOfChoices
        username={player1}
        player={gameType === "vs-player" ? `[ PLAYER 1 ]` : ""}
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

      {popupVisible && <Popup handleClose={handleClosePopup}>{popupValue}</Popup>}
      {loading ? (
        <div style={{width: "100px", height: "100px"}}>
          <LoaderSpin />
        </div>
      ) : (
        <div className="versus-img">{result === null || result === undefined ? <Image src={FightIcon} /> : <ResultBox gameType={gameType} result={result} />}</div>
      )}
      <div className={`refresh-img ${gameType === "vs-com" ? "" : "displayNone"}`} onClick={handleRefresh}>
        <Image src={RefreshIcon} />
      </div>

      <ListOfChoices
        username={player2}
        player={gameType === "vs-player" ? `[ PLAYER 2 ]` : ""}
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
