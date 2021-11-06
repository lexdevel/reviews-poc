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
  const collection = db.collection('users');

  const mapper = user => ({
    id: user._id,
    username: user.username,
    fullname: user.fullname,
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
      users: async (parent, args, context, info) => collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createUser: async (parent, args, context, info) => {
        const id = new ObjectId();

        await runInTransaction(async () => {
          const user = await collection.findOne({ username: args.username });
          if (user !== null) {
            throw new ApolloError(`The user with specified username '${args.username}' already exists.`, 'CONFLICT');
          }

          await collection.insertOne({
            _id: id,
            username: args.username,
            fullname: args.fullname,
          });
        });

        redisPubsub.publish('user:created', { id: id, username: args.username, fullname: args.fullname });

        return id;
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
