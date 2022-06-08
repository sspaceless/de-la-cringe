import CringeRoom from '../../CringeRoom.js';
import CrocodileRoomState from './schema/CrocodileRoomState.js';
import PlayerState from './schema/PlayerState.js';
import * as constants from './config.js';
import MessageState from './schema/MessageState.js';

class CrocodileRoom extends CringeRoom {
  async onCreate() {
    await super.onCreate();
    this.maxClients = 8;
    this.setState(new CrocodileRoomState());

    this.onMessage(constants.STAGE_MESSAGE_TYPE, async (client, message) => {
      this.state.setStage(message.stage);

      if (this.state.message === constants.GAME_STAGE) {
        await this.state.setNewWord();
      }
    });

    this.onMessage(constants.DRAW_MESSAGE_TYPE, (client, message) => {
      this.state.canvas.resetPoints();
      this.state.setCanvasState(message);
    });

    this.onMessage(constants.NEW_MESSAGE_MESSAGE_TYPE, (client, message) => {
      const { messageText } = message;
      const newMessage = new MessageState(messageText, client.sessionId);
      this.state.messages.push(newMessage);

      const isAnswerTrue = this.checkAnswer(messageText);
      if (isAnswerTrue) {
        const painter = this.state.players[this.state.queueNumber];
        const guesser = this.state.players.find((item) => item.id === client.sessionId);

        painter.addPoints(constants.POINTS_FOR_EXPLANATION);
        guesser.addPoints(constants.POINTS_FOR_ANSWER);

        this.state.setStage(constants.RESULTS_STAGE);
      }
    });
  }

  checkAnswer(message) {
    return message.trim().toUpperCase() === this.word;
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
