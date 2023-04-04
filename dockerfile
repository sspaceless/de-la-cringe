FROM node:alpine

WORKDIR /client

EXPOSE 3000

ENV APP_API_URL=https://de-la-cringe-api-server.azurewebsites.net
ENV APP_CLIENT_URL=https://de-la-cringe.azurewebsites.net
ENV APP_COLYSEUS_URL=wss://game-server.azurewebsites.net

COPY package*.json ./
RUN npm ci --force
COPY . .

CMD ["npx", "serve", "build"]
