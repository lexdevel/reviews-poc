import { ObjectId, MongoClient } from 'mongodb';
import { createClient } from 'redis';

/**
 * @param {MongoClient} mongoClient
 * @param {ReturnType<createClient>} redisClient
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('stock');

  redisClient.subscribe('product:created', async message => {
    console.log(`Product:created message handling...`);
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
