import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';

const gateway = new ApolloGateway({
  serviceList: [
    { name: "products", url: process.env.PRODUCTS_URL },
    { name: "reviews", url: process.env.REVIEWS_URL },
    { name: "stock", url: process.env.STOCK_URL },
    { name: "users", url: process.env.USERS_URL },
  ],
});

const server = new ApolloServer({
  gateway,
  engine: false,
  subscriptions: false,
});

(async () => {
  const { url } = await server.listen({ port: process.env.PORT });
  console.log(`Gateway is running on ${url}...`);
})();
