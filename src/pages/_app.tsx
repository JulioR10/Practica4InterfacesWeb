import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import getClient from "../lib/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getClient();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
