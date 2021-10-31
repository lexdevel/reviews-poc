FROM node:latest

ARG SERVICE_PATH

WORKDIR /app

COPY ./package.json .
COPY ./src/serviceRunner/serviceRunner.js .
COPY ./${SERVICE_PATH}/buildResolvers.js .
COPY ./${SERVICE_PATH}/schema.graphql .

RUN npm install

ENTRYPOINT [ "node", "serviceRunner.js" ]
