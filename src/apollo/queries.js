import gql from "graphql-tag";

export const getGameAndMomentData = gql`
  query Query(
    $fetchMomentInput: FetchMomentInput
    $getGameInput: GetGameInput
  ) {
    fetchMoment(fetchMomentInput: $fetchMomentInput) {
      id
      appId
      snapshotId
      title
      description
      type
      scoreLabel
      scoreZoneId
      time
      playCost
      unlockXp
      unlockCost
      data
      timesPlayed
      showTimer
      momentType
      rankOrder
      status
      createdAt
      updatedAt
      isCompleted
      zoneId
    }
    getGame(getGameInput: $getGameInput) {
      id
      title
      description
      data
      company
      category
      timesPlayed
      rotationMode
      status
      type
      canUseCash
      isLike
      likeCount
      totalCompleted
      countMoments
      hasBattle
      hasSolo
      hasTournament
    }
  }
`;
