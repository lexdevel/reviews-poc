# Service runner
Service runnes is a universal host for services.
Each service is a GraphQL schema and a function called `buildResolvers`, as parameters it gets the required dependencies and returns GraphQL resolvers.

```js
export async function buildResolvers(mongoClient, redisClient) {
  // Handle database with `mongoClient`
  // Handle pubsub with `redisClient`

  return {
  };
}
```
