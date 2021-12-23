import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://3xj7i67lte.execute-api.us-east-1.amazonaws.com/dev",
  includeExtensions: true,
});

let client = null;

export const getInstance = () => {
  if (client) return client;

  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken || "",
      },
    };
  });

  client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: "https://3xj7i67lte.execute-api.us-east-1.amazonaws.com/dev",
    cache: new InMemoryCache({}),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      },
    },
  });

  return client;
};

const apollo = {
  getInstance,
};

export default apollo;
