import { ObjectId, MongoClient } from 'mongodb';
import { RedisPubsub } from '@lexdevel/redis-pubsub';

/**
 * Build resolvers.
 * @param {MongoClient} mongoClient - Mongo client.
 * @param {RedisPubsub} redisPubsub - Redis pubsub.
 */
export async function buildResolvers(mongoClient, redisPubsub) {
  const db = mongoClient.db();
  const collection = db.collection('products');

  const mapper = product => ({
    id: product._id,
    title: product.title,
    price: product.price,
    categoryId: product.categoryId,
    tagIds: product.tagIds,
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
          categoryId: args.categoryId,
          tagIds: args.tagIds,
        });

        redisPubsub.publish('product:created', { id: id, countInStock: args.countInStock });

        return id;
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
