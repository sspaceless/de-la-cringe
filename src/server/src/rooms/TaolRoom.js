import CringeRoom from '../CringeRoom.js';
import PlayerState from './schema/taol-schemas/PlayerState.js';
import TaolRoomState from './schema/taol-schemas/TaolRoomState.js';
import { toalQuestions } from './schema/taol-schemas/taol-questions.js';
import QuestionState from './schema/taol-schemas/QuestionState.js';
import AnswerState from './schema/taol-schemas/AnswerState.js';

class TaolRoom extends CringeRoom {
  constructor() {
    super();
    this.questions = [...toalQuestions];
  }

  async onCreate() {
    await super.onCreate();

    this.maxClients = 8;
    this.setState(new TaolRoomState());

    this.onMessage('STAGE', (client, message) => {
      this.state.stage = message.stage;

      if (message.stage === 'PERSONAL-QUESTION') {
        this.state.players.forEach((player) => {
          const unusedQuestions = this.questions.filter((item) => !item.isUsed);
          const randomIndex = Math.round(Math.random() * (unusedQuestions.length - 1));
          // eslint-disable-next-line no-param-reassign
          player.question = new QuestionState(unusedQuestions[randomIndex]);
          this.questions.find((item) => item.id === player.question.id).isUsed = true;
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

      if (message.type === 'PUBLIC') {
        const { answer, questionFor } = message;
        const questionForPlayer = players.find((item) => item.id === questionFor);
        const answeredPlayer = players.find((item) => item.id === client.sessionId);

        questionForPlayer.question.answers.set(
          client.sessionId,
          new AnswerState({ answer, isTruth: false })
        );
        answeredPlayer.isAnswered = true;

        const answersCount = questionForPlayer.question.answers.size;
        if (answersCount === players.length) {
          this.state.stage = 'VOTING';

          players.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.isAnswered = false;
          });
        }
      }
    });

    this.onMessage('VOTE', (client, message) => {
      const { players, questionNumber } = this.state;
      const { answerId } = message;
      const votedPlayer = players.find((item) => item.id === client.sessionId);
      const answer = players[questionNumber].question.answers.get(answerId);

      answer.votes.push(client.sessionId);
      votedPlayer.isAnswered = true;

      const votesCount = players.filter((item) => item.isAnswered === true).length;
      if (votesCount === players.length - 1) {
        this.state.stage = 'RESULTS';

        players.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.isAnswered = false;
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
    const leavingPlayer = this.state.players.find((item) => item.id === client.sessionId);
    const isLeavingPlayerVip = leavingPlayer.isVip;
    this.state.players.splice(this.state.players.indexOf(leavingPlayer), 1);

    if (isLeavingPlayerVip && this.state.players.length >= 1) {
      this.state.players[0].isVip = true;
    }

    console.log(client.sessionId, 'left!');
  }

  async onDispose() {
    await super.onDispose();
    console.log('room', this.roomId, 'disposing...');
  }
}

export default TaolRoom;
