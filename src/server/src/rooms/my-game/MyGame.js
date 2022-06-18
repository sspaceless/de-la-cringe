import CringeRoom from '../../CringeRoom.js';
import MGState from './schema/MGState.js';
import MGPlayer from './schema/MGPlayer.js';
import { FILES_URL, Settings, Themes, MessageTypes, Stages } from './MGConfig.js';
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
      if (this.state.stage !== Stages.LOBBY) return;
      if (this.timerState) return;

      this.updateState(Stages.STARTING);
      this.nextRound(Settings.TIME_FOR_START);
    });

    this.onMessage(MessageTypes.QUESTION_SELECT, (client, { theme, price }) => {
      if (this.state.stage !== Stages.QUESTION_SELECTION) return;
      if (this.state.lastAnsweredUserId !== client.sessionId
       && this.state.host.id !== client.sessionId) return;
      if (!this.state.round.themes[theme].available.includes(price)) return;
      if (this.timerState?.active) return;

      this.showQuestion(theme, price);
    });

    this.onMessage(MessageTypes.ANSWER_REQUEST, (client) => {
      if (this.state.stage !== Stages.QUESTION_SHOWING) return;
      if (this.state.curQuestionAnswers.includes(client.sessionId)) return;
      if (this.timerState?.active) return;

      const player = this.state.players.get(client.sessionId);

      if (player.lastAnswerTime <= Date.now() - Settings.ANSWER_RELOAD) {
        player.lastAnswerTime = Date.now();

        this.state.answeringClientId = client.sessionId;
        this.updateState(Stages.ANSWER_WAITING);
      }
    });

    this.onMessage(MessageTypes.ANSWER_DECISION, (client, { accepted }) => {
      if (client.sessionId !== this.state.host.id) return;
      if (this.state.stage !== Stages.ANSWER_WAITING) return;
      if (this.timerState?.active) return;

      if (this.timerA?.active) this.timerA.clear();

      this.broadcast(MessageTypes.ANSWER_DECISION, { accepted });

      const player = this.state.players.get(this.state.answeringClientId);
      const pointsChange = this.state.round.curQuestion.price * (accepted ? 1 : -1);
      player.points += pointsChange;

      if (accepted) {
        this.state.lastAnsweredUserId = player.id;
        this.state.round.curQuestion.answeredUserId = player.id;
        this.state.round.curQuestion.answer = this.answer;

        this.updateState(Stages.ANSWER_SHOWING, Settings.TIME_FOR_ANSWER_DECISION);
      } else {
        const timeToAdd = this.timeLeft + Settings.TIME_FOR_ANSWER_DECISION;
        this.state.questionWaitUntil = Date.now() + timeToAdd;
        this.timerQ.resume();

        this.updateState(Stages.QUESTION_SHOWING, Settings.TIME_FOR_ANSWER_DECISION);
      }
    });
  }

  onJoin(client, options) {
    if (!options.avatarUrl) throw new Error('Unauthorized user');

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
      case Stages.STARTING:
        this.state.startingUntil = Date.now() + Settings.TIME_FOR_START;
        break;

      case Stages.ANSWER_SHOWING:
        if (this.timerQ?.active) this.timerQ.clear();

        if (this.state.answeringClientId) this.state.answeringClientId = null;

        this.state.curQuestionAnswers.splice(0, this.state.curQuestionAnswers.length);

        if (!this.state.isExtra) {
          let unavailableCount = 0;

          this.state.round.themes.forEach((value) => {
            if (value.available.length === 0) unavailableCount++;
          });

          if (unavailableCount === this.state.round.themes.size) {
            this.updateState(Stages.ROUND_RESULTS_SHOWING, Settings.TIME_FOR_ANSWER_SHOWING);
          } else {
            this.updateState(Stages.QUESTION_SELECTION, Settings.TIME_FOR_ANSWER_SHOWING);
          }
        } else {
          this.nextRound(Settings.TIME_FOR_ANSWER_SHOWING);
        }
        break;

      case Stages.QUESTION_SHOWING: {
        if (this.state.answeringClientId) this.state.answeringClientId = null;

        if (this.timerQ?.active) break;

        this.state.questionWaitUntil = Date.now() + Settings.TIME_FOR_QUESTION;

        this.timerQ = this.clock.setTimeout(
          () => {
            this.state.round.curQuestion.answer = this.answer;

            this.updateState(Stages.ANSWER_SHOWING);
          },
          Settings.TIME_FOR_QUESTION
        );
        break;
      }

      case Stages.QUESTION_FILE_SHOWING:
        this.state.fileShowingWaitUntil = Date.now() + this.state.round.curQuestion.fileDuration;

        this.updateState(Stages.QUESTION_SHOWING, this.state.round.curQuestion.fileDuration);
        break;

      case Stages.ANSWER_WAITING:
        this.startWaitingForAnswer();
        break;

      case Stages.ROUND_RESULTS_SHOWING: {
        this.state.isExtra = true;

        const unusedTopics = Themes.filter((x) => !this.state.themes.includes(x));

        const r = Math.floor(Math.random() * unusedTopics.length);
        const theme = unusedTopics[r];

        this.state.showingResultsUntil = Date.now() + Settings.TIME_FOR_RESULTS_SHOWING;

        this.showQuestion(theme, Settings.MAX_PRICE, Settings.TIME_FOR_RESULTS_SHOWING);
        break;
      }
      case Stages.GAME_RESULTS: {
        const playersList = Array.from(this.state.players.values());
        this.state.winner = playersList.sort((a, b) => b.points - a.points)[0];
        break;
      }

      default:
        break;
    }
  }

  static getQuestion(theme, price) {
    const r2 = Math.floor(Math.random() * Questions[theme][price].length);
    const question = Questions[theme][price][r2];

    return question;
  }

  generateQuestion(theme, price) {
    const mult = this.state.isExtra ? Settings.EXTRA_MULTIPLIER : 1;

    const q = MyGame.getQuestion(theme, price);
    const question = new MGQuestion(q.text, theme, price * mult);

    if (q.file) {
      const fileUrl = `${FILES_URL}/${q.file.type}/${q.file.name}`;
      question.addFile(fileUrl, q.file.type, q.file.duration * 1000);
    }

    this.answer = q.answer;

    this.state.round.curQuestion = question;

    if (!this.state.isExtra) {
      this.state.round.questions.push(question);

      const arrayOfPrices = this.state.round.themes[theme].available;
      const i = arrayOfPrices.indexOf(price);
      arrayOfPrices.splice(i, 1);
    }
  }

  showQuestion(theme, price, delay) {
    this.generateQuestion(theme, price);

    if (this.state.round.curQuestion.fileUrl) {
      this.updateState(Stages.QUESTION_FILE_SHOWING, delay);
    } else {
      this.updateState(Stages.QUESTION_SHOWING, delay);
    }
  }

  nextRound(timeout) {
    if (this.state.availableThemes.length === 0) this.updateState(Stages.GAME_RESULTS, timeout);

    this.clock.setTimeout(() => {
      const themes = [];

      for (let i = 0; i < 2 && this.state.availableThemes.length; i++) {
        const r = Math.floor(Math.random() * this.state.availableThemes.length);

        themes.push(this.state.availableThemes[r]);
        this.state.availableThemes.splice(r, 1);
      }

      const roundNum = this.state.round ? this.state.round.num + 1 : 1;

      this.state.round = new MGRound(themes, roundNum);

      this.updateState(Stages.QUESTION_SELECTION);
    }, timeout);
  }

  startWaitingForAnswer() {
    const clientId = this.state.answeringClientId;

    this.state.curQuestionAnswers.push(clientId);

    this.timeLeft = this.state.questionWaitUntil - Date.now();
    this.state.answerWaitUntil = Date.now() + Settings.TIME_FOR_ANSWER_WAITING;

    this.timerQ.pause();

    const host = this.clients.find((x) => x.sessionId === this.state.host.id);

    this.broadcast(MessageTypes.ANSWER_REQUEST_ACCEPT, { clientId }, { except: host });
    host.send(MessageTypes.ANSWER_REQUEST_ACCEPT, { clientId, answer: this.answer });

    this.timerA = this.clock.setTimeout(() => {
      this.broadcast(MessageTypes.ANSWER_DECISION, { accepted: false });

      this.state.questionWaitUntil = Date.now() + this.timeLeft + Settings.TIME_FOR_ANSWER_DECISION;
      this.timerQ.resume();

      this.updateState(Stages.QUESTION_SHOWING, Settings.TIME_FOR_ANSWER_DECISION);
    }, Settings.TIME_FOR_ANSWER_WAITING);
  }
}

export default MyGame;
