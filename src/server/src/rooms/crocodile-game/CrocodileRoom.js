import CringeRoom from '../../CringeRoom.js';
import CrocodileRoomState from './schema/CrocodileRoomState.js';
import PlayerState from './schema/PlayerSate.js';
import * as constants from './config.js';

class CrocodileRoom extends CringeRoom {
  async onCreate() {
    await super.onCreate();
    this.maxClients = 8;
    this.setState(new CrocodileRoomState());

    this.onMessage(constants.DRAWING_MESSAGE_TYPE, (client, message) => {
      const { canvasState } = message;
      this.state.setCanvasState(canvasState);
    });
  }

  onJoin(client, options) {
    const { username: name, avatarUrl, isVip } = options;
    const player = new PlayerState(client.sessionId, name, avatarUrl, isVip);

    this.state.addPlayer(player);

    console.log(client.sessionId, 'joined!');
  }

  onLeave(client) {
    const { sessionId } = client;
    this.state.deletePlayer(sessionId);
  }

  async onDispose() {
    await super.onDispose();
    console.log('room', this.roomId, 'disposing...');
  }
}

export default CrocodileRoom;
