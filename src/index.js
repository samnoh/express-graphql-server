import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from 'graphql/schema';
import rootValue from 'graphql/root';
import db from 'models';

const app = express();

db.sequelize.sync();

app.set('port', process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true
    })
);

app.listen(app.get('port'), () => {
    console.log(`Running a GraphQL API server at port ${app.get('port')}`);
});
