import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const client = new ApolloClient({
    uri: process.env.REACT_APP_APOLLO_URI || 'http://localhost:8000/graphql',
    cache
});

export default client;
