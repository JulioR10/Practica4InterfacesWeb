import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const getClient = () => {
  if (typeof window !== "undefined") {
    // Si window no es undefined, estamos en el lado del cliente
    if (!client) {
      // Si el cliente aún no se ha creado, crea una nueva instancia
      client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
      });
    }
    return client;
  } else {
    // Si window es undefined, estamos en el lado del servidor
    return new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql",
      cache: new InMemoryCache(),
    });
  }
};

export default getClient;
