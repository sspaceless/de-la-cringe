import CringeRoom from '../CringeRoom.js';
import PlayerState from './schema/taol-schemas/PlayerState.js';
import TaolRoomState from './schema/taol-schemas/TaolRoomState.js';
import { toalQuestions } from './schema/taol-schemas/taol-questions.js';
import QuestionState from './schema/taol-schemas/QuestionState.js';
import AnswerState from './schema/taol-schemas/AnswerState.js';

const STAGE_MESSAGE_TYPE = 'STAGE';
const ANSWER_MESSAGE_TYPE = 'ANSWER';
const VOTE_MESSAGE_TYPE = 'VOTE';
const PUBLIC_MESSAGE_TYPE = 'PUBLIC';
const PERSONAL_MESSAGE_TYPE = 'PERSONAL';
const NEXT_QUESTION_MESSAGE_TYPE = 'NEXT_QUESTION';

const PUBLIC_QUESTION_STAGE = 'PUBLIC-QUESTION';
const PERSONAL_QUESTION_STAGE = 'PERSONAL-QUESTION';
const VOTING_STAGE = 'VOTING';
const RESULTS_STAGE = 'RESULTS';

const POINTS_FOR_TRUTH = 50;
const POINTS_FOR_LYING = 50;
class TaolRoom extends CringeRoom {
  constructor() {
    super();
    this.questions = [...toalQuestions];
  }

  async onCreate() {
    await super.onCreate();

    this.maxClients = 8;
    this.setState(new TaolRoomState());

    this.onMessage(STAGE_MESSAGE_TYPE, (client, message) => {
      this.state.stage = message.stage;

      if (message.stage === PERSONAL_QUESTION_STAGE) {
        this.state.players.forEach((player) => {
          const unusedQuestions = this.questions.filter((item) => !item.isUsed);
          const randomIndex = Math.round(Math.random() * (unusedQuestions.length - 1));
          // eslint-disable-next-line no-param-reassign
          player.question = new QuestionState(unusedQuestions[randomIndex]);
          this.questions.find((item) => item.id === player.question.id).isUsed = true;
        });
      }
    });

    this.onMessage(ANSWER_MESSAGE_TYPE, (client, message) => {
      const { players } = this.state;

      if (message.type === PERSONAL_MESSAGE_TYPE) {
        const { answer } = message;
        const player = players.find((item) => item.id === client.sessionId);

        player.question.answers.set(
          client.sessionId,
          new AnswerState({ answer, isTruth: true })
        );
        player.isAnswered = true;

        const answersCount = players.filter((item) => {
          const { answers } = item.question;
          return answers.get(item.id) !== undefined;
        }).length;

        if (answersCount === players.length) {
          this.state.stage = PUBLIC_QUESTION_STAGE;

          players.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.isAnswered = false;
          });
        }
      }

      if (message.type === PUBLIC_MESSAGE_TYPE) {
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
          this.state.stage = VOTING_STAGE;

          players.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.isAnswered = false;
          });
        }
      }
    });

    this.onMessage(VOTE_MESSAGE_TYPE, (client, message) => {
      const { players, questionNumber } = this.state;
      const { answerId } = message;

      const votedPlayer = players.find((item) => item.id === client.sessionId);
      const answeredPlayer = players.find((item) => item.id === answerId);
      const answer = players[questionNumber].question.answers.get(answerId);

      answer.votes.push(client.sessionId);

      if (answer.isTruth) {
        votedPlayer.points += POINTS_FOR_TRUTH;
        players[questionNumber].points += POINTS_FOR_TRUTH;
      } else {
        answeredPlayer.points += POINTS_FOR_LYING;
      }

      votedPlayer.isAnswered = true;

      const votesCount = players.filter((item) => item.isAnswered === true).length;
      if (votesCount === players.length - 1) {
        this.state.stage = RESULTS_STAGE;

        players.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.isAnswered = false;
        });
      }
    });

    this.onMessage(NEXT_QUESTION_MESSAGE_TYPE, () => {
      this.state.stage = PUBLIC_QUESTION_STAGE;
      this.state.questionNumber += 1;
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
