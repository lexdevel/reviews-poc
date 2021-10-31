import { buildSubgraphSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { buildResolvers } from './buildResolvers.js';
import { createClient } from 'redis';

const serviceName = process.env.SERVICE_NAME;
const mongoClient = new MongoClient(process.env.DB_CONNECTION_STRING);
const redisClient = createClient(process.env.REDIS_CONNECTION_STRING);
const typeDefs = gql(readFileSync('./schema.graphql').toString('utf8'));

(async() => {
  await mongoClient.connect();
  const resolvers = await buildResolvers(mongoClient, redisClient);

  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs,
        resolvers
      }
    ])
  });

  const { url } = await server.listen({ port: 80 });
  console.log(`${serviceName} service is running at ${url}...`);
})();
