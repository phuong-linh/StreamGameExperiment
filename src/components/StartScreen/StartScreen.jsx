import React from "react";
import "./StartScreen.css";
import GamePreloadPlaceholder from "./assets/GamePreloadPlaceholder.png";
import Loading from "./assets/Loading.svg";

const StartScreen = (props) => {
  const { gameAndMoment, streamReadyCallback, setPlayAt } = props;

  const getGamePreload = (gameId) => {
    return (
      "https://assets-dev.onmostealth.com/assets/games/" +
      gameId +
      "/GamePreload/Image_750x732.png"
    );
  };
  const onErrorGetGamePreload = (id) => {
    const thisImage = document.getElementById(id);
    if (thisImage) {
      thisImage.setAttribute("src", GamePreloadPlaceholder);
    }
  };

  const onClickPlay = () => {
    try {
      streamReadyCallback.payload();
    } catch (e) {
      console.error(`Fail to run ready call back functions`, e);
    }
    setPlayAt(Date.now());
  };

  return (
    <div className="startScreen">
      <div className="top">
        <img
          id={gameAndMoment?.game.id}
          src={getGamePreload(gameAndMoment?.game.id)}
          onError={onErrorGetGamePreload(gameAndMoment?.game.id)}
          alt=""
        />
        <p>{gameAndMoment?.game.title}</p>
        <div></div>
      </div>
      <div className="bottom">
        <p>{gameAndMoment?.moment.title}</p>
        {!streamReadyCallback && <img src={Loading} alt="" />}
        <button
          className={!streamReadyCallback ? "disableBtn" : ""}
          onClick={onClickPlay}
        >
          Start Now
        </button>
      </div>
    </div>
  );
};
export default StartScreen;
