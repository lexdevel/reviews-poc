import { ObjectId, MongoClient } from 'mongodb';
import { RedisClient } from 'redis';

/**
 * Build resolvers.
 * @param {MongoClient} mongoClient - Mongo client.
 * @param {RedisClient} redisClient - Redis client.
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('stock');

  const mapper = stock => ({
    id: stock._id,
    productId: stock.productId,
    count: stock.count,
  });

  redisClient.subscribe('product:created');
  redisClient.on('message', async (channel, message) => {
    console.log(`Got message on ${channel} -> ${message}`);
    const product = JSON.parse(message);

    await collection.insertOne({
      _id: new ObjectId(),
      productId: new ObjectId(product.id),
      count: product.countInStock,
    });
  });

  return {
    Product: {
      inStock: async product => {
        const stock = await collection.findOne({ productId: new ObjectId(product.id) });
        return stock.count > 0;
      },
      countInStock: async product => {
        const stock = await collection.findOne({ productId: new ObjectId(product.id) });
        return stock.count;
      },
    },
  };
}
