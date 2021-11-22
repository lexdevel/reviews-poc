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
  const collection = db.collection('tags');

  const mapper = tag => ({
    id: tag._id,
    name: tag.name,
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
      tags: async (parent, args, context, info) => collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createTag: async (parent, args, context, info) => {
        const id = new ObjectId();

        await runInTransaction(async () => {
          const tag = await collection.findOne({ name: args.name });
          if (tag !== null) {
            throw new ApolloError(`The tag with specified name '${args.name}' already exists.`, 'CONFLICT');
          }

          await collection.insertOne({
            _id: id,
            name: args.name,
          });
        });

        redisPubsub.publish('tag:created', { id: id, name: args.name });

        return id;
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
