# Reviewzzz
A yet another proof-of-concept project to learn [NodeJS](https://nodejs.org) and [Apollo Federation](https://apollographql.com). I do [livestream](https://www.twitch.tv/lexdevel) of this project development, please feel free to subscribe :)

## Development environment requirements
1. [Docker](https://docker.com)
2. [NodeJS](https://nodejs.org)
3. Your favirite IDE

## Running
Clone this repo, navigate to the sources, run `docker-compose up --build` command.
For development also run `npm install` to enable intellisense.

## How-to add a service
1. Create a directory under `/src/services` directory
2. Create `schema.graphql` file and define GraphQL schema for the service
3. Create `buildResolvers.js` file and implement resolvers for the schema
4. Update `compose.yml`
    - Add service definition based on the existing ones
    - Add environment variable containing service url to the gateway definition
    - Add service to `depends_on` section on gateway
6. Add service definition to gateway in `serviceList` in `/src/gateway/index.js` file
