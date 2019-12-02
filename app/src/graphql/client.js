import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
    uri: process.env.REACT_APP_APOLLO_URI || 'http://localhost:8000/graphql',
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    },
    cache: new InMemoryCache()
});

export default client;
