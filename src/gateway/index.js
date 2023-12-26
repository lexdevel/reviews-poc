import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

(async () => {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: "categories", url: process.env.CATEGORIES_URL },
      { name: "products", url: process.env.PRODUCTS_URL },
      { name: "reviews", url: process.env.REVIEWS_URL },
      { name: "stock", url: process.env.STOCK_URL },
      { name: "tags", url: process.env.TAGS_URL },
      { name: "users", url: process.env.USERS_URL },
    ],
  });

  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
  });

  const { url } = await startStandaloneServer(server, { listen: { port: process.env.PORT || 4000 } });
  console.log(`gateway is running on ${url}...`);
})();
