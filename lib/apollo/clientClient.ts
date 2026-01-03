    "use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const clientApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.HYGRAPH_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});