import { ObjectId, MongoClient } from "mongodb";
import { RedisClient } from "redis";

/**
 * Build resolvers.
 * @param {MongoClient} mongoClient - Mongo client.
 * @param {RedisClient} redisClient - Redis client.
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('products');

  const mapper = product => ({
    id: product._id,
    title: product.title,
    price: product.price,
  });

  return {
    Query: {
      products: async (parent, args, context, info) => await collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createProduct: async (parent, args, context, info) => {
        const id = new ObjectId();

        await collection.insertOne({
          _id: id,
          title: args.title,
          price: args.price,
        });

        redisClient.publish('product:created', JSON.stringify({ id: id, countInStock: args.countInStock }));

        return id;
      },
    },
    Product: {
      __resolveReference: async reference => {
        const product = await collection.findOne({ _id: new ObjectId(reference.id) });
        return mapper(product);
      },
    },
  };
}
