import CrocodileRoomState from './schema/CrocodileRoomState.js';
import getRandomWord from './modules/word-api.js';
import MessageState from './schema/MessageState.js';
import PlayerState from './schema/PlayerState.js';
import CringeRoom from '../../CringeRoom.js';
import * as constants from './config.js';

class CrocodileRoom extends CringeRoom {
  constructor() {
    super();
    this.wordsArray = [];
  }

  async onCreate() {
    await super.onCreate();
    this.maxClients = 8;
    this.setState(new CrocodileRoomState());

    const word = await getRandomWord();
    this.wordsArray.push(word);

    this.onMessage(constants.STAGE_MESSAGE_TYPE, async (client, message) => {
      this.state.setStage(message.stage);

      if (this.state.stage === constants.GAME_STAGE) {
        this.state.resetTimer(89);
        this.state.resetQueue();
        await this.setNewWord();
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

    this.onMessage(constants.SKIP_DRAWING_MESSAGE_TYPE, async () => {
      const painter = this.state.players[this.state.queueNumber];

      const loseMessageText = `На жаль, ${painter.name} не встиг :( Правильна відповідь - ${this.state.word}.`;
      const loseMessage = new MessageState(loseMessageText, 'SYSTEM');
      this.state.messages.push(loseMessage);

      await this.nextRound();
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

        await this.nextRound();
      }
    });
  }

  async setNewWord() {
    this.state.setWord(this.wordsArray.pop());
    const newWord = await getRandomWord();
    this.wordsArray.push(newWord);
  }

  async nextRound() {
    const isPlayerLast = this.state.queueNumber + 1 === this.state.players.length;
    if (isPlayerLast) {
      this.state.setStage(constants.RESULTS_STAGE);
      return;
    }

    this.state.canvas.resetPoints();
    this.broadcast(constants.CLEAR_CANVAS_MESSAGE_TYPE);

    this.state.resetTimer(89);
    this.state.nextPlayer();
    await this.setNewWord();
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
