import React, { useEffect, useState } from "react";
import StreamingView from "../../appland/StreamingView";
import StreamingController from "../../appland/StreamingController";
import { STREAM_ENDPOINT } from "../../constants";
import { Models } from "../../models/models";
import StartScreen from "../StartScreen/StartScreen";

const GameSession = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("gameId");
  const momentId = urlParams.get("momentId");
  const userId = urlParams.get("userId");

  const [sessionData, setSessionData] = useState(null);
  const [isStreamReady, setStreamReady] = useState(false);
  const [playAt, setPlayAt] = useState(null);
  const [gameAndMoment, setGameAndMoment] = useState(null);

  const onStreamEvent = async (event, payload) => {
    console.log("event", event);
    if (event === StreamingController.EVENT_STREAM_READY) {
      setStreamReady(true);
    }
  };

  const getGameSessionData = async () => {
    const gameAndMoment = await Models.getGameAndMomentData(gameId, momentId);
    setGameAndMoment(gameAndMoment);
    const deviceInfo = await Models.getDeviceInfo();
    const sessionData = await Models.playMoment({
      device: { info: deviceInfo },
      gameId,
      momentId,
      sessionType: "CASUAL",
    });
    console.log("sessionData", sessionData);
    setSessionData(sessionData);
  };

  useEffect(() => {
    getGameSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!playAt && (
        <StartScreen
          gameAndMoment={gameAndMoment}
          isStreamReady={isStreamReady}
          setPlayAt={setPlayAt}
        />
      )}
      {sessionData && (
        <StreamingView
          key={sessionData.gameSessionId}
          userClickedPlayAt={playAt}
          apiEndpoint={STREAM_ENDPOINT}
          edgeNodeId={sessionData.edgeNodeId}
          userId={userId}
          enableControl={true}
          enableDebug={false}
          enableFullScreen={true}
          muted={false}
          volume={1}
          onEvent={(evt, payload) => onStreamEvent(evt, payload)}
        ></StreamingView>
      )}
    </>
  );
};
export default GameSession;
