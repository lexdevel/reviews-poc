import { ObjectId, MongoClient } from 'mongodb';
import { ApolloError } from 'apollo-server-errors';
import { RedisPubsub } from '@lexdevel/redis-pubsub';

/**
 * Build resolvers.
 * @param {MongoClient} mongoClient - Mongo client.
 * @param {RedisPubsub} redisPubsub - Redis pubsub.
 */
export async function buildResolvers(mongoClient, redisPubsub) {
  const db = mongoClient.db();
  const collection = db.collection('categories');

  const mapper = category => ({
    id: category._id,
    name: category.name,
  });

  const runInTransaction = async func => {
    const session = mongoClient.startSession();
    session.startTransaction();

    try {
      await func();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      if (session.inTransaction()) {
        await session.commitTransaction();
      }
    }
  };

  return {
    Query: {
      categories: async (parent, args, context, info) => collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createCategory: async (parent, args, context, info) => {
        const id = new ObjectId();

        await runInTransaction(async () => {
          const category = await collection.findOne({ name: args.name });
          if (category !== null) {
            throw new ApolloError(`The category with specified name '${args.name}' already exists.`, 'CONFLICT');
          }

          await collection.insertOne({
            _id: id,
            name: args.name,
          });
        });

        redisPubsub.publish('category:created', { id: id, name: args.name });

        return id;
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
