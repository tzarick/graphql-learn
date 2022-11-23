import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';
import dotenv from 'dotenv';

dotenv.config(); // load in values from .env into environment

console.log(typeof process.env.PGPASSWORD);

context.pg_client.connect()
  .then(() => {
    console.log('DB connection successful.');
  })
  .catch((error: any) => {
    throw new Error(`Postgres client connection failed! Connection error: ${error}`);
  });

export const server = new ApolloServer({
  schema,
  context
});

const port = 3000;

server.listen({ port }).then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});