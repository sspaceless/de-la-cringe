FROM node:alpine

WORKDIR /client

EXPOSE 3000

ENV REACT_APP_API_URL=https://de-la-cringe-api-server.azurewebsites.net
ENV REACT_APP_CLIENT_URL=https://de-la-cringe.azurewebsites.net
ENV REACT_APP_COLYSEUS_URL=wss://game-server.azurewebsites.net

COPY package*.json ./
RUN npm i --force
COPY . .

CMD ["npm", "run", "start:client"]
