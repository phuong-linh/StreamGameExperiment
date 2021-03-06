import { playSoloMoment } from "../apollo/mutation";
import apollo from "../clients/apollo";
import StreamingController from "../appland/StreamingController";
import { STREAM_ENDPOINT } from "../constants";
import { getGameAndMomentData } from "../apollo/queries";

const apolloClient = apollo.getInstance();

export class Models {
  static getDeviceInfo = async () => {
    const streamingController = await StreamingController({
      apiEndpoint: STREAM_ENDPOINT,
    });
    const res = await streamingController.getDeviceInfo();
    //do not delete this console log
    console.log("[Rob0] DeviceInfo payload: " + JSON.stringify(res));

    return JSON.stringify(res);
  };

  static getGameAndMomentData = async (gameId, momentId) => {
    const response = await apolloClient.query({
      query: getGameAndMomentData,
      variables: {
        fetchMomentInput: { id: momentId },
        getGameInput: { id: gameId },
      },
    });
    return { game: response.data.getGame, moment: response.data.fetchMoment };
  };

  static playMoment = async (params) => {
    const response = await apolloClient.mutate({
      mutation: playSoloMoment,
      variables: { playSoloMomentInput: params },
    });
    return response.data.playSoloMoment;
  };
}
