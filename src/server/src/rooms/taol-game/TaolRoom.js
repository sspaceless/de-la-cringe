/* eslint-disable no-param-reassign */
import fs from 'fs';
import CringeRoom from '../../CringeRoom.js';
import AnswerState from './schema/AnswerState.js';
import PlayerState from './schema/PlayerState.js';
import QuestionState from './schema/QuestionState.js';
import TaolRoomState from './schema/TaolRoomState.js';
import * as constants from './config.js';

const taolQuestionsPath = './src/rooms/taol-game/taol-questions.json';
const taolQuestionsJSON = fs.readFileSync(taolQuestionsPath, 'utf8');
const taolQuestions = JSON.parse(taolQuestionsJSON);

class TaolRoom extends CringeRoom {
  constructor() {
    super();
    this.questions = [...taolQuestions];
  }

  async onCreate() {
    await super.onCreate();
    this.maxClients = 8;
    this.setState(new TaolRoomState());

    this.onMessage(constants.STAGE_MESSAGE_TYPE, (client, message) => {
      this.state.setStage(message.stage);

      if (message.stage === constants.PERSONAL_QUESTION_STAGE) {
        this.state.resetTimer();

        this.state.players.forEach((player) => {
          const unusedQuestions = this.questions.filter((item) => !item.isUsed);
          const randomIndex = Math.round(Math.random() * unusedQuestions.length);

          const question = unusedQuestions[randomIndex];
          question.publicQuestion = question.publicQuestion
            .replace(
              constants.PLAYER_MASK,
              player.name
            );

          player.setQuestion(new QuestionState(question));
          player.setIsAnswered(false);

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
        player.setIsAnswered(true);

        const answersCount = players.filter((item) => {
          const { answers } = item.question;
          return answers.get(item.id) !== undefined;
        }).length;

        if (answersCount === players.length) {
          this.state.setStage(constants.PUBLIC_QUESTION_STAGE);
          this.state.resetTimer();

          players.forEach((item) => {
            item.setIsAnswered(false);
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
        answeredPlayer.setIsAnswered(true);

        const answersCount = questionForPlayer.question.answers.size;
        if (answersCount === players.length) {
          this.state.setStage(constants.VOTING_STAGE);
          this.state.resetTimer();

          players.forEach((item) => {
            item.setIsAnswered(false);
          });
        }
      }
    });

    this.onMessage(constants.VOTE_MESSAGE_TYPE, (client, message) => {
      const { players, questionNumber } = this.state;
      const { answerId } = message;
      const votedPlayer = players.find((item) => item.id === client.sessionId);

      if (answerId !== undefined) {
        const answeredPlayer = players.find((item) => item.id === answerId);
        const answer = players[questionNumber].question.answers.get(answerId);

        answer.votes.push(client.sessionId);

        if (answer.isTruth) {
          votedPlayer.addPoints(constants.POINTS_FOR_TRUTH);
          players[questionNumber].addPoints(constants.POINTS_FOR_TRUTH);
        } else {
          answeredPlayer.addPoints(constants.POINTS_FOR_LYING);
        }
      }

      votedPlayer.setIsAnswered(true);

      const votesCount = players.filter((item) => item.isAnswered === true).length;
      if (votesCount === players.length - 1) {
        this.state.setStage(constants.RESULTS_STAGE);
        players.forEach((item) => {
          item.setIsAnswered(false);
        });
      }
    });

    this.onMessage(constants.NEXT_QUESTION_MESSAGE_TYPE, () => {
      this.state.setStage(constants.PUBLIC_QUESTION_STAGE);
      this.state.nextQuestion();
      this.state.resetTimer();
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

export default TaolRoom;
