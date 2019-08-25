FROM node:12.9-alpine

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/mockServer

RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]
