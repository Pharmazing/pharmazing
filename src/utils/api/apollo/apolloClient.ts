import { ApolloClient, HttpLink, from, InMemoryCache } from "@apollo/client";
import {
  appAuthMiddleware,
  webAuthMiddleware,
} from "./middleware/authMiddleware";
import { isWeb } from "../../hooks";

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL,
});

export const client = new ApolloClient({
  link: from([isWeb ? webAuthMiddleware : appAuthMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
