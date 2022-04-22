/* eslint-disable no-console */
import * as Colyseus from 'colyseus.js';

const client = new Colyseus.Client('ws://localhost:2567');

const createRoom = (game, userName, setRoomId, onStateChange,) => {
  const options = { userName, isVip: true };
  client
    .create(game, options)
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
    const options = { userName, isVip: false };

    if (roomsId.includes(roomId)) {
      client
        .joinById(roomId, options)
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
