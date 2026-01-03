import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { BLOGS_BY_CATEGORY } from "./queries";
import { Blog } from "@/data/blogs";
import { serverApolloClient } from "./apollo/serverClient";

const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!endpoint) {
  throw new Error("HYGRAPH_ENDPOINT is missing");
}

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: endpoint,
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export async function getBlogsByCategory(
  slug: string
): Promise<Blog[]> {
  const { data } = await serverApolloClient.query<{
    blogs: Blog[];
  }>({
    query: BLOGS_BY_CATEGORY,
    variables: { slug },
  });

  return data?.blogs ?? [];
}