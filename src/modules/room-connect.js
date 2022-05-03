import * as Colyseus from 'colyseus.js';

const client = new Colyseus.Client('ws://localhost:2567');
let connectedRoom;

const createRoom = async (game, userName, setRoomId, onStateChange,) => {
  const options = { userName, isVip: true };
  try {
    connectedRoom = await client.create(game, options);
    connectedRoom.onStateChange(onStateChange.bind(null, connectedRoom.sessionId));
    setRoomId(connectedRoom.id);
  } catch (e) {
    console.log(e);
  }
};

const joinRoom = async (game, userName, roomId, onStateChange) => {
  const roomArray = await client.getAvailableRooms(game);

  const isRoomExist = roomArray.map((room) => room.roomId).includes(roomId);
  const options = { userName, isVip: false };

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

export { createRoom, joinRoom, sendMessage };
