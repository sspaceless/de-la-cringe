import CringeRoom from '../../CringeRoom.js';
import CrocodileRoomState from './schema/CrocodileRoomState.js';
import PlayerState from './schema/PlayerSate.js';
import * as constants from './config.js';
import getRandomWord from './modules/word-api.js';

class CrocodileRoom extends CringeRoom {
  async onCreate() {
    await super.onCreate();
    this.maxClients = 8;
    this.setState(new CrocodileRoomState());

    this.onMessage(constants.STAGE_MESSAGE_TYPE, async (client, message) => {
      this.state.setStage(message.stage);

      if (this.state.message === constants.GAME_STAGE) {
        const word = await getRandomWord();
        this.state.setWord(word);
      }
    });

    this.onMessage(constants.DRAW_MESSAGE_TYPE, (client, message) => {
      this.state.canvas.resetPoints();
      this.state.setCanvasState(message);
    });
  }

  onJoin(client, options) {
    const { username: name, avatarUrl, isVip } = options;
    const player = new PlayerState(client.sessionId, name, avatarUrl, isVip);
    this.state.addPlayer(player);
  }

  onLeave(client) {
    const { sessionId } = client;
    this.state.deletePlayer(sessionId);
  }

  async onDispose() {
    await super.onDispose();
  }
}

export default CrocodileRoom;
