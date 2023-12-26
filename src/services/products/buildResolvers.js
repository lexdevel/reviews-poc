import { ObjectId, MongoClient } from 'mongodb';
import { createClient } from 'redis';

/**
 * @param {MongoClient} mongoClient
 * @param {ReturnType<createClient>} redisClient
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('products');

  const mapper = product => ({
    id: product._id,
    title: product.title,
    price: product.price,
    categoryId: product.categoryId,
    tagIds: product.tagIds,
  });

  redisClient.subscribe('category:removed', async message => {
    const { id } = JSON.parse(message);
    await collection.updateMany({ categoryId: new ObjectId(id) }, { $set: { categoryId: new ObjectId('000000000000000000000000') } });
  });

  redisClient.subscribe('tag:removed', async message => {
    const { id } = JSON.parse(message);
    await collection.updateMany({}, { $pull: { tagIds: new ObjectId(id) } });
  });

  return {
    Query: {
      products: async (parent, args, context, info) => await collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createProduct: async (parent, args, context, info) => {
        const result = await collection.insertOne({
          _id: new ObjectId(),
          title: args.title,
          price: args.price,
          categoryId: args.categoryId,
          tagIds: args.tagIds,
        });

        await redisClient.publish('product:created', JSON.stringify({ id: result.insertedId, countInStock: args.countInStock }));

        return result.insertedId;
      },
    },
    Product: {
      __resolveReference: async reference => {
        const product = await collection.findOne({ _id: new ObjectId(reference.id) });
        return mapper(product);
      },
      category: product => ({ __typename: "Category", id: product.categoryId }),
      tags: product => product.tagIds.map(tagId => ({ __typename: "Tag", id: tagId })),
    },
  };
}
