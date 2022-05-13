import CringeRoom from '../../CringeRoom.js';
import MGState from './schema/MGState.js';
import MGPlayer from './schema/MGPlayer.js';
import { Settings, Themes, MessageTypes, States } from './MGConfig.js';
import MGRound from './schema/MGRound.js';
import Questions from './MGQuestions.js';
import MGQuestion from './schema/MGQuestion.js';

class MyGame extends CringeRoom {
  async onCreate({ themes }) {
    this.clock.start();

    await super.onCreate();

    this.setState(new MGState(themes));
    this.maxClients = 8;

    this.onMessage(MessageTypes.START, (client) => {
      if (this.state.host.id !== client.sessionId) return;
      if (this.state.stage !== States.LOBBY) return;
      if (this.timerState) return;

      this.updateState(States.STARTING);
      this.nextRound(Settings.TIME_FOR_START);
    });

    this.onMessage(MessageTypes.QUESTION_SELECT, (client, { theme, price }) => {
      if (this.state.stage !== States.QUESTION_SELECTION) return;
      if (this.state.lastAnsweredUserId !== client.sessionId
       && this.state.host.id !== client.sessionId) return;
      if (!this.state.round.themes[theme].available.includes(price)) return;
      if (this.timerState?.active) return;

      this.generateQuestion(theme, price);
    });

    this.onMessage(MessageTypes.ANSWER_REQUEST, (client) => {
      if (this.state.stage !== States.QUESTION_SHOWING) return;
      if (this.timerState?.active) return;

      const player = this.state.players.get(client.sessionId);

      if (player.lastAnswerTime <= Date.now() - Settings.ANSWER_RELOAD) {
        player.lastAnswerTime = Date.now();

        this.state.answeringClientId = client.sessionId;
        this.updateState(States.ANSWER_WAITING);
      }
    });

    this.onMessage(MessageTypes.ANSWER_DECISION, (client, { accepted }) => {
      if (client.sessionId !== this.state.host.id) return;
      if (this.state.stage !== States.ANSWER_WAITING) return;
      if (this.timerState?.active) return;

      if (this.timerA?.active) this.timerA.clear();

      this.state.answerWaitUntil = undefined;

      this.broadcast(MessageTypes.ANSWER_DECISION, { accepted });

      const player = this.state.players.get(this.state.answeringClientId);
      const pointsChange = this.state.round.curQuestion.price * accepted ? 1 : -1;
      player.points += pointsChange;

      if (accepted) {
        this.state.lastAnsweredUserId = player.id;
        this.state.round.curQuestion.answeredUserId = player.id;

        this.state.curAnswer = this.answer;
        this.updateState(States.ANSWER_SHOWING, Settings.TIME_FOR_ANSWER_DECISION);
      } else {
        this.state.questionWaitUntil += this.timeLeft;

        this.updateState(States.QUESTION_SHOWING, Settings.TIME_FOR_ANSWER_DECISION);
      }
    });
  }

  onJoin(client, options) {
    const player = new MGPlayer(
      client.sessionId,
      options.username,
      options.isVip,
      options.avatarUrl
    );

    if (this.state.host) {
      if (this.state.players.size === 0) this.state.lastAnsweredUserId = player.id;

      this.state.players.set(client.sessionId, player);
    } else {
      this.state.host = player;
    }
  }

  updateState(stage, timeout) {
    if (this.timerState?.active) return;

    if (timeout) {
      this.timerState = this.clock.setTimeout(() => this._updateState(stage), timeout);
    } else {
      this._updateState(stage);
    }
  }

  _updateState(stage) {
    this.timerState?.clear();

    this.state.stage = stage;

    switch (this.state.stage) {
      case States.STARTING:
        this.state.startingUntil = Date.now() + Settings.TIME_FOR_START;
        break;

      case States.ANSWER_SHOWING:
        if (this.timerQ?.active) this.timerQ.clear();

        if (!this.state.isExtra) {
          this.updateState(States.QUESTION_SELECTION, Settings.TIME_FOR_ANSWER_SHOWING);
        } else {
          this.nextRound(Settings.TIME_FOR_ANSWER_SHOWING);
        }
        break;

      case States.QUESTION_SHOWING:
        this.timerQ = this.clock.setTimeout(
          () => this.updateState(States.ANSWER_SHOWING),
          Settings.TIME_FOR_QUESTION
        );
        break;

      case States.ROUND_END:
        this.clock.setTimeout(() => this.generateExtraQuestion(), Settings.TIME_FOR_ROUND_END);
        break;

      case States.ANSWER_WAITING:
        this.startWaitingForAnswer();
        break;

      case States.QUESTION_SELECTION: {
        let unavailableCount = 0;

        this.state.round.themes.forEach((value) => {
          if (value.available.length === 0) unavailableCount++;
        });

        if (unavailableCount === this.state.round.themes.size) {
          this.updateState(States.ROUND_RESULTS_SHOWING);
        }
        break;
      }

      default:
        break;
    }
  }

  static getQuestion(themes, price) {
    const r = Math.floor(Math.random() * themes.length);
    const theme = themes[r];

    const r2 = Math.floor(Math.random() * Questions[theme][price].length);
    const question = Questions[theme][price][r2];

    question.theme = theme;
    question.price = price;

    return question;
  }

  generateQuestion(theme, price) {
    const q = MyGame.getQuestion([theme], price);
    const question = new MGQuestion(q.text, theme, price);

    this.answer = q.answer;

    this.state.round.curQuestion = question;
    this.state.round.questions.push(question);

    const arrayOfPrices = this.state.round.themes[theme].available;
    const i = arrayOfPrices.indexOf(price);
    arrayOfPrices.splice(i, 1);

    this.state.questionWaitUntil = Date.now() + Settings.TIME_FOR_QUESTION;

    this.updateState(States.QUESTION_SHOWING);
  }

  generateExtraQuestion() {
    const themes = Themes.filter((v) => !this.themes.includes(v));
    const question = MyGame.getQuestion(themes, Settings.MAX_PRICE);

    this.answer = question.answer;
    delete question.answer;

    question.price *= Settings.EXTRA_MULTIPLIER;

    this.state.round.curQuestion = question;
    this.state.round.questions.push(question);

    this.state.questionWaitUntil = Date.now() + Settings.TIME_FOR_QUESTION;

    this.updateState(States.QUESTION_SHOWING);
  }

  nextRound(timeout) {
    const themes = [];

    for (let i = 0; i < 2 && this.state.themes.length; i++) {
      const r = Math.floor(Math.random() * this.state.themes.length);

      themes.push(this.state.themes[r]);
      this.state.themes.splice(r, 1);
    }

    const roundNum = this.state.round ? this.state.round.num + 1 : 1;

    this.state.round = new MGRound(themes, roundNum);

    this.updateState(States.QUESTION_SELECTION, timeout);
  }

  startWaitingForAnswer() {
    const clientId = this.state.answeringClientId;

    this.timeLeft = this.state.questionWaitUntil - Date.now();
    this.state.answerWaitUntil = Date.now() + Settings.TIME_FOR_ANSWER_WAITING;

    const host = this.clients.find((x) => x.sessionId === this.state.host.id);

    this.broadcast(MessageTypes.ANSWER_REQUEST_ACCEPT, { clientId }, { except: host });
    host.send(MessageTypes.ANSWER_REQUEST_ACCEPT, { clientId, answer: this.answer });

    this.timerA = this.clock.setTimeout(() => {
      this.state.answerWaitUntil = undefined;

      this.broadcast(MessageTypes.ANSWER_DECISION, { accepted: false });

      this.state.questionWaitUntil = Date.now() + this.timeLeft + Settings.TIME_FOR_ANSWER_DECISION;
      this.updateState(States.QUESTION_SHOWING, Settings.TIME_FOR_ANSWER_DECISION);
    }, Settings.TIME_FOR_ANSWER_WAITING);
  }
}

export default MyGame;
