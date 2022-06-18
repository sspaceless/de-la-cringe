/* eslint-disable no-console */
import * as Colyseus from 'colyseus.js';
import Config from '../config';

const client = new Colyseus.Client(Config.COLYSEUS_URL);
let connectedRoom;

const createRoom = async (game, userData, setRoomId, onStateChange) => {
  const { username, avatar } = userData;
  const options = { username, avatar, isVip: true };
  try {
    connectedRoom = await client.create(game, options);
    connectedRoom.onStateChange(onStateChange.bind(null, connectedRoom.sessionId));
    setRoomId(connectedRoom.id);
  } catch (e) {
    console.log(e);
  }
};

const joinRoom = async (game, userData, roomId, onStateChange) => {
  const { username, avatar } = userData;
  const options = { username, avatar, isVip: false };

  const roomArray = await client.getAvailableRooms(game);
  const isRoomExist = roomArray.map((room) => room.roomId).includes(roomId);

  if (isRoomExist) {
    try {
      connectedRoom = await client.joinById(roomId, options);
      connectedRoom.onStateChange(onStateChange.bind(null, connectedRoom.sessionId));
    } catch (e) {
      console.log(e);
    }
  } else {
    throw new Error('The room is full or does not exist!');
  }
};

const sendMessage = (type, message) => {
  connectedRoom.send(type, message);
};

const onMessage = (type, callback) => {
  connectedRoom.onMessage(type, callback);
};

export { createRoom, joinRoom, sendMessage, onMessage };
