import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';

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