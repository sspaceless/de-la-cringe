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

      if (this.state.stage === constants.GAME_STAGE) {
        await this.state.setNewWord();
        this.state.resetTimer();
      }
    });

    this.onMessage(constants.CLEAR_CANVAS_MESSAGE_TYPE, () => {
      this.state.canvas.resetPoints();
      this.broadcast(constants.CLEAR_CANVAS_MESSAGE_TYPE);
    });

    this.onMessage(constants.DRAW_MESSAGE_TYPE, (client, message) => {
      this.state.canvas.resetPoints();
      this.state.setCanvasState(message);
    });

    this.onMessage(constants.NEW_MESSAGE_MESSAGE_TYPE, async (client, message) => {
      const { messageText } = message;
      const newMessage = new MessageState(messageText, client.sessionId);
      this.state.messages.push(newMessage);

      const isAnswerTrue = this.checkAnswer(messageText);
      if (isAnswerTrue) {
        const painter = this.state.players[this.state.queueNumber];
        const guesser = this.state.players.find((item) => item.id === client.sessionId);

        painter.addPoints(constants.POINTS_FOR_EXPLANATION);
        guesser.addPoints(constants.POINTS_FOR_ANSWER);

        const winMessageText = `${guesser.name} розпізнав малюнок ${painter.name}.
                                ${guesser.name} + ${constants.POINTS_FOR_ANSWER} балів,
                                ${painter.name} + ${constants.POINTS_FOR_EXPLANATION} балів :)`;
        const winMessage = new MessageState(winMessageText, 'SYSTEM');
        this.state.messages.push(winMessage);

        this.state.nextPlayer();
        await this.state.setNewWord();
        this.state.resetTimer();
      }
    });
  }

  checkAnswer(message) {
    return message.trim().toUpperCase() === this.state.word;
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
