/* eslint-disable no-console */
import * as Colyseus from 'colyseus.js';

const client = new Colyseus.Client('ws://localhost:2567');

const createRoom = (game, userName, onStateChange) => {
  client
    .create(game, { userName })
    .then((room) => {
      room.onStateChange(onStateChange);
    })
    .catch((error) => {
      console.log(error);
    });
};

const joinRoom = (roomId, userName, onStateChange) => {
  client
    .joinById(roomId, { userName })
    .then((room) => {
      room.onStateChange(onStateChange);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { createRoom, joinRoom };
