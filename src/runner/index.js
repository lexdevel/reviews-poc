import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'graphql-tag';
import { MongoClient } from 'mongodb';
import { createClient } from 'redis';
import { readFileSync } from 'fs';

import { buildResolvers } from './buildResolvers.js';

const mongoClient = new MongoClient(process.env.DB_CONNECTION_STRING);
const redisClient = createClient({ url: process.env.REDIS_CONNECTION_STRING });

async function main() {
  await mongoClient.connect();
  await redisClient.connect();

  const schema = readFileSync('schema.graphql', { encoding: 'utf8' });
  const typeDefs = gql`${schema}`;
  const resolvers = await buildResolvers(mongoClient, redisClient);
  const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

  const { url } = await startStandaloneServer(server, { listen: { port: 80 } });
  console.log(`${process.env.SERVICE_NAME} service is running on ${url}...`);
}

main().catch(console.error);
