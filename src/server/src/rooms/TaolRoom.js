import { Room } from 'colyseus';
import PlayerState from './schema/taol-schemas/PlayerState.js';
import TaolRoomState from './schema/taol-schemas/TaolRoomState.js';
import { questions } from './schema/taol-schemas/taol-questions.js';
import QuestionState from './schema/taol-schemas/QuestionState.js';
import AnswerState from './schema/taol-schemas/AnswerState.js';

class TaolRoom extends Room {
  onCreate() {
    this.maxClients = 8;
    this.setState(new TaolRoomState());

    this.onMessage('STAGE', (client, message) => {
      this.state.stage = message.stage;

      if (message.stage === 'PERSONAL-QUESTION') {
        const unusedQuestions = questions.filter((item) => !item.isUsed);

        this.state.players.forEach((player) => {
          const randomIndex = Math.round(Math.random() * (unusedQuestions.length - 1));
          // eslint-disable-next-line no-param-reassign
          player.question = new QuestionState(unusedQuestions[randomIndex]);
          questions.find((item) => item.id === player.question.id).isUsed = true;
        });
      }
    });

    this.onMessage('ANSWER', (client, message) => {
      const { players } = this.state;
      if (message.type === 'PERSONAL') {
        const { answer } = message;
        const player = players.find((item) => item.id === client.sessionId);

        player.question.answers.set(client.sessionId, new AnswerState({ answer, isTruth: true }));
        player.isAnswered = true;

        const answersCount = players.filter((item) => {
          const { answers } = item.question;
          return answers.get(item.id) !== undefined;
        }).length;

        if (answersCount === players.length) {
          this.state.stage = 'PUBLIC-QUESTION';

          players.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.isAnswered = false;
          });
        }
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
    const leavingPlayer = this.state.players.find((item) => item.id === client.sessionId);
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
