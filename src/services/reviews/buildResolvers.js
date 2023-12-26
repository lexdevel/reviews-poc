import { ObjectId, MongoClient } from 'mongodb';
import { createClient } from 'redis';

/**
 * @param {MongoClient} mongoClient
 * @param {ReturnType<createClient>} redisClient
 */
export async function buildResolvers(mongoClient, redisClient) {
  const db = mongoClient.db();
  const collection = db.collection('reviews');

  const mapper = review => ({
    id: review._id,
    commentary: review.commentary,
    userId: review.userId,
    productId: review.productId,
  });

  return {
    Query: {
      reviews: async (parent, args, context, info) => await collection.find().map(mapper).toArray(),
    },
    Mutation: {
      createReview: async (parent, args, context, info) => {
        const result = await collection.insertOne({
          _id: id,
          commentary: args.commentary,
          userId: new ObjectId(args.userId),
          productId: new ObjectId(args.productId),
        });

        return result.insertedId;
      },
    },
    Review: {
      __resolveReference: async reference => {
        const review = await collection.findOne({ _id: new ObjectId(reference.id) });
        return mapper(review);
      },
      author: review => ({ __typename: "User", id: review.userId }),
      product: review => ({ __typename: "Product", id: review.productId }),
    },
    User: {
      reviews: async user => await collection.find({ userId: new ObjectId(user.id) }).map(mapper).toArray(),
    },
    Product: {
      reviews: async product => await collection.find({ productId: new ObjectId(product.id) }).map(mapper).toArray(),
    },
  };
}
