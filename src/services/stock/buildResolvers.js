import { ObjectId, MongoClient } from 'mongodb';
import { RedisPubsub } from '@lexdevel/redis-pubsub';

/**
 * Build resolvers.
 * @param {MongoClient} mongoClient - Mongo client.
 * @param {RedisPubsub} redisPubsub - Redis pubsub.
 */
export async function buildResolvers(mongoClient, redisPubsub) {
  const db = mongoClient.db();
  const collection = db.collection('stock');

  redisPubsub.subscribe('product:created', async product => {
    console.log(`Product:created message handling...`);
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
