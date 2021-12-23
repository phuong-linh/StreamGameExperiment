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

  const [edgeNodeId, setEdgeNodeId] = useState(null);
  const [isStreamReady, setStreamReady] = useState(false);
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
    const edgeNodeId = await Models.createStream({
      gameId,
      snapshotId: gameAndMoment.moment.snapshotId,
      device: { info: deviceInfo },
    });
    setEdgeNodeId(edgeNodeId);
  };

  useEffect(() => {
    getGameSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isStreamReady && (
        <StartScreen
          gameAndMoment={gameAndMoment}
          isStreamReady={isStreamReady}
        />
      )}
      {edgeNodeId && (
        <StreamingView
          // key={gameSession?.id}
          // userClickedPlayAt={parseInt(startAt, 10)}
          apiEndpoint={STREAM_ENDPOINT}
          edgeNodeId={edgeNodeId}
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
