import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws'

import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

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

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',

  options: {
    reconnect: true,
  },
})
const httpLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink as any,
  httpLink as any
)
const apolloClient = new ApolloClient({
  cache,
  link: link as any,
  defaultOptions,
})
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
