FROM node:21.5 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable

EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html
