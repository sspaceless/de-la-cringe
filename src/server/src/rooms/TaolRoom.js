import { Room } from 'colyseus';
import PlayerState from './schema/taol-schemas/PlayerState.js';
import QuestionState from './schema/taol-schemas/QuestionState.js';
import TaolRoomState from './schema/taol-schemas/TaolRoomState.js';
import { questions } from './schema/taol-schemas/taol-questions.js';

class TaolRoom extends Room {
  onCreate() {
    this.maxClients = 8;
    this.setState(new TaolRoomState());
    this.state.questions = questions.map((question) => new QuestionState(question));
    console.log(this.state.questions);

    this.onMessage('STAGE', (client, message) => {
      this.state.stage = message.stage;

      if (message.stage === 'FIRST') {
        const unusedQuestions = this.state.questions.filter((item) => !item.isUsed);

        this.state.players.forEach((player) => {
          const randomIndex = Math.round(Math.random() * (unusedQuestions.length - 1));
          // eslint-disable-next-line no-param-reassign
          player.questionId = unusedQuestions[randomIndex].id;
          this.state.questions.find((item) => item.id === player.questionId).isUsed = true;
        });
      }
    });
  }

  onJoin(client, options) {
    const { userName: name, isVip } = options;
    const player = new PlayerState(client.sessionId, name, isVip);

    this.state.players.push(player);
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client) {
    const leavingPlayer = this.state.players.find((player) => player.id === client.sessionId);
    this.state.players.splice(this.state.players.indexOf(leavingPlayer), 1);

    if (leavingPlayer.isVip && this.state.players.length > 1) {
      this.state.players[0].isVip = true;
    }

    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}

export default TaolRoom;
