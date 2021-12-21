import gql from "graphql-tag";

export const createStream = gql`
  mutation Mutation($createStreamInput: CreateStreamInput) {
    createStream(createStreamInput: $createStreamInput) {
      edgeNodeId
    }
  }
`;
