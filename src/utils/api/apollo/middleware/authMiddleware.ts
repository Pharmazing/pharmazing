import { ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStorage from "expo-secure-store";

export const webAuthMiddleware = new ApolloLink((operation, forward) => {
  const session = localStorage.getItem("session");
  const parsedSession = session ? JSON.parse(session) : null;
  const headers = {
    ["Authorization"]: parsedSession?.token
      ? `Bearer ${parsedSession.token}`
      : "",
  };
  operation.setContext({
    headers,
  });

  return forward(operation);
});

export const appAuthMiddleware = setContext(async (req, { headers }) => {
  const session = await SecureStorage.getItemAsync("session");
  const parsedToken = session ? JSON.parse(session) : null;
  return {
    headers: {
      ...headers,
      authorization: parsedToken ? `Bearer ${parsedToken.token}` : "",
    },
  };
});
