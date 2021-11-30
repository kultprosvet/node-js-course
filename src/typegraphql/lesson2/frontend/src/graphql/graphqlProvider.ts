import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const cache = new InMemoryCache()
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  defaultOptions,
})
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
