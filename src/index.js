import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { PORT } from 'config/secret';
import { resolvers, typeDefs } from 'graphql';
import verifyAuth from 'middlewares/auth';
import db from 'models';

const app = express();
db.sequelize.sync();

app.set('port', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: verifyAuth
});
server.applyMiddleware({ app });

app.listen(app.get('port'), () => {
    console.log(`Running a GraphQL API server at :${app.get('port')}${server.graphqlPath}`);
});
