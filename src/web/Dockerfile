FROM node:21.5 AS build

EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
