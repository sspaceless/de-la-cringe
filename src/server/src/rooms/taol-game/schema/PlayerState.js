import * as schema from '@colyseus/schema';
import CringePlayer from '../../../CringePlayer.js';
import QuestionState from './QuestionState.js';

class PlayerState extends CringePlayer {
  constructor(id, name, avatarUrl, isVip,) {
    super(id, name, avatarUrl, isVip);
    this.points = 0;
  }

  setQuestion(question) {
    this.question = question;
  }

  setIsAnswered(isAnswered) {
    this.isAnswered = isAnswered;
  }

  addPoints(points) {
    this.points += points;
  }
}

schema.defineTypes(PlayerState, {
  points: 'number',
  isAnswered: 'boolean',
  question: QuestionState,
});

export default PlayerState;
