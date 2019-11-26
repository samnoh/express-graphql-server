import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from 'graphql/schema';
import root from 'graphql/root';

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(app.get('port'), () => {
    console.log(`Running a GraphQL API server at port ${app.get('port')}`);
});
