import { ObjectId, MongoClient } from 'mongodb';
import { createClient } from 'redis';

/**
 * @param {MongoClient} mongoClient
 * @param {ReturnType<createClient>} redisClient
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('users');

  const mapper = user => ({
    id: user._id,
    username: user.username,
    fullname: user.fullname,
  });

  return {
    Query: {
      users: async (parent, args, context, info) => collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createUser: async (parent, args, context, info) => {
        try {
          const result = await collection.insertOne({ _id: id, username: args.username, fullname: args.fullname });

          await redisClient.publish('user:created', { id: id, username: args.username, fullname: args.fullname });
          return result.insertedId;
        } catch (error) {
          if (error.code === 11000) {
            // MongoDB error code 11000 is for duplicate key error
            throw new GraphQLError('User with the username provided already exists', { extensions: { code: 'BAD_REQUEST' } });
          }

          throw new GraphQLError('An unexpected error occurred', { extensions: { code: 'INTERNAL_SERVER_ERROR' }, originalError: error });
        }
      },
    },
    User: {
      __resolveReference: async reference => {
        const user = await collection.findOne({ _id: new ObjectId(reference.id) });
        return mapper(user);
      },
    },
  };
}
