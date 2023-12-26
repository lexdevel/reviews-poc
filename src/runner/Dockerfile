FROM node:21.5

ARG SERVICE_NAME

WORKDIR /app

COPY ./src/runner/package.json .
COPY ./src/runner/index.js .

COPY ./src/services/${SERVICE_NAME}/buildResolvers.js .
COPY ./src/schemas/${SERVICE_NAME}.graphql ./schema.graphql

RUN npm install

ENTRYPOINT [ "node", "index.js" ]
