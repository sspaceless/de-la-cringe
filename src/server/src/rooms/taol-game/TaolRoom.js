import CringeRoom from '../../CringeRoom.js';
import AnswerState from './schema/AnswerState.js';
import PlayerState from './schema/PlayerState.js';
import QuestionState from './schema/QuestionState.js';
import TaolRoomState from './schema/TaolRoomState.js';
import { toalQuestions } from './taol-questions.js';
import * as constants from './config.js';

class TaolRoom extends CringeRoom {
  constructor() {
    super();
    this.questions = [...toalQuestions];
  }

  async onCreate() {
    await super.onCreate();

    this.maxClients = 8;
    this.setState(new TaolRoomState());

    this.onMessage(constants.STAGE_MESSAGE_TYPE, (client, message) => {
      this.state.stage = message.stage;

      if (message.stage === constants.PERSONAL_QUESTION_STAGE) {
        this.state.players.forEach((player) => {
          const unusedQuestions = this.questions.filter((item) => !item.isUsed);
          const randomIndex = Math.round(Math.random() * (unusedQuestions.length - 1));
          // eslint-disable-next-line no-param-reassign
          player.question = new QuestionState(unusedQuestions[randomIndex]);
          this.questions.find((item) => item.id === player.question.id).isUsed = true;
        });
      }
    });

    this.onMessage(constants.ANSWER_MESSAGE_TYPE, (client, message) => {
      const { players } = this.state;

      if (message.type === constants.PERSONAL_MESSAGE_TYPE) {
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
          this.state.stage = constants.PUBLIC_QUESTION_STAGE;

          players.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.isAnswered = false;
          });
        }
      }

      if (message.type === constants.PUBLIC_MESSAGE_TYPE) {
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
          this.state.stage = constants.VOTING_STAGE;

          players.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.isAnswered = false;
          });
        }
      }
    });

    this.onMessage(constants.VOTE_MESSAGE_TYPE, (client, message) => {
      const { players, questionNumber } = this.state;
      const { answerId } = message;

      const votedPlayer = players.find((item) => item.id === client.sessionId);
      const answeredPlayer = players.find((item) => item.id === answerId);
      const answer = players[questionNumber].question.answers.get(answerId);

      answer.votes.push(client.sessionId);

      if (answer.isTruth) {
        votedPlayer.points += constants.POINTS_FOR_TRUTH;
        players[questionNumber].points += constants.POINTS_FOR_TRUTH;
      } else {
        answeredPlayer.points += constants.POINTS_FOR_LYING;
      }

      votedPlayer.isAnswered = true;

      const votesCount = players.filter((item) => item.isAnswered === true).length;
      if (votesCount === players.length - 1) {
        this.state.stage = constants.RESULTS_STAGE;

        players.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.isAnswered = false;
        });
      }
    });

    this.onMessage(constants.NEXT_QUESTION_MESSAGE_TYPE, () => {
      this.state.stage = constants.PUBLIC_QUESTION_STAGE;
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
