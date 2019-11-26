import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from 'graphql/typeDefs';
import resolvers from 'graphql/resolvers';
import db from 'models';

const app = express();
db.sequelize.sync();

app.set('port', process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
});
server.applyMiddleware({ app });

app.listen(app.get('port'), () => {
    console.log(`Running a GraphQL API server at :${app.get('port')}${server.graphqlPath}`);
});
