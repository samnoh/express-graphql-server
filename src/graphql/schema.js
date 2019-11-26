import path from 'path';
import { buildSchema } from 'graphql';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

export default buildSchema(typeDefs);
