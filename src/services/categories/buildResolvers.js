import { ObjectId, MongoClient } from 'mongodb';
import { createClient } from 'redis';

/**
 * @param {MongoClient} mongoClient
 * @param {ReturnType<createClient>} redisClient
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('categories');

  const mapper = category => ({ id: category._id, name: category.name });

  return {
    Query: {
      categories: async (parent, args, context, info) => collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createCategory: async (parent, args, context, info) => {
        try {
          const result = await collection.insertOne({ _id: new ObjectId(), name: args.name });

          await redisClient.publish('category:created', JSON.stringify({ id: result.insertedId, name: args.name }));
          return result.insertedId;
        } catch (error) {
          if (error.code === 11000) {
            // MongoDB error code 11000 is for duplicate key error
            throw new GraphQLError('Category with the name provided already exists', { extensions: { code: 'BAD_REQUEST' } });
          }

          throw new GraphQLError('An unexpected error occurred', { extensions: { code: 'INTERNAL_SERVER_ERROR' }, originalError: error });
        }
      },
      removeCategory: async (parent, args, context, info) => {
        if (args.id === '000000000000000000000000') {
          throw new GraphQLError('Cannot remove the default category', { extensions: { code: 'BAD_REQUEST' } });
        }

        const result = await collection.findOneAndDelete({ _id: new ObjectId(args.id) });
        if (!result) {
          return false;
        }

        await redisClient.publish('category:removed', JSON.stringify({ id: args.id }));
        return true;
      },
    },
    Category: {
      __resolveReference: async reference => {
        const category = await collection.findOne({ _id: new ObjectId(reference.id) });
        return mapper(category);
      },
    },
  };
}
