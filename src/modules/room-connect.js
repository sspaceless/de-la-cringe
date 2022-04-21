/* eslint-disable no-console */
import * as Colyseus from 'colyseus.js';

const client = new Colyseus.Client('ws://localhost:2567');

const createRoom = (game, userName, setRoomId, onStateChange,) => {
  client
    .create(game, {
      userName
    })
    .then((room) => {
      room.onStateChange(onStateChange);
      setRoomId(room.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

const joinRoom = (game, userName, roomId, onStateChange) => {
  client.getAvailableRooms(game).then((rooms) => {
    const roomsId = rooms.map((room) => room.roomId);
    console.log(roomId);
    if (roomsId.includes(roomId)) {
      client
        .joinById(roomId, {
          userName
        })
        .then((room) => {
          room.onStateChange(onStateChange);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

export { createRoom, joinRoom };
