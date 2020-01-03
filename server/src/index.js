import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { PORT, NODE_ENV } from 'config/secret';
import { resolvers, typeDefs } from 'graphql';
import verifyAuth from 'middlewares/auth';
import db from 'models';

const app = express();

db.sequelize.sync();

app.set('port', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: NODE_ENV === 'production' ? '' : 'http://localhost:3000',
        credentials: true
    })
);
app.use(cookieParser());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: verifyAuth,
    cors: false
});

server.applyMiddleware({
    app,
    cors: false
});

app.listen(app.get('port'), () => {
    console.log(`Running a GraphQL API server at :${app.get('port')}${server.graphqlPath}`);
});
