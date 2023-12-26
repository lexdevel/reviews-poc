import { ObjectId, MongoClient } from 'mongodb';
import { createClient } from 'redis';

/**
 * @param {MongoClient} mongoClient
 * @param {ReturnType<createClient>} redisClient
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('tags');

  const mapper = tag => ({
    id: tag._id,
    name: tag.name,
  });

  return {
    Query: {
      tags: async (parent, args, context, info) => collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createTag: async (parent, args, context, info) => {
        try {
          const result = await collection.insertOne({ _id: new ObjectId(), name: args.name });

          await redisClient.publish('tag:created', { id: id, name: args.name });
          return result.insertedId;
        } catch (error) {
          if (error.code === 11000) {
            // MongoDB error code 11000 is for duplicate key error
            throw new GraphQLError('Tag with the name provided already exists', { extensions: { code: 'BAD_REQUEST' } });
          }

          throw new GraphQLError('An unexpected error occurred', { extensions: { code: 'INTERNAL_SERVER_ERROR' }, originalError: error });
        }
      },
      removeTag: async (parent, args, context, info) => {
        const result = await collection.findOneAndDelete({ _id: new ObjectId(args.id) });
        if (!result) {
          return false;
        }

        await redisClient.publish('tag:removed', JSON.stringify({ id: args.id }));
        return true;
      },
    },
    Tag: {
      __resolveReference: async reference => {
        const tag = await collection.findOne({ _id: new ObjectId(reference.id) });
        return mapper(tag);
      },
    },
  };
}
