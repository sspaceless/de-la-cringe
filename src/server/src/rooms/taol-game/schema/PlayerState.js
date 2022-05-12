import * as schema from '@colyseus/schema';
import CringePlayer from '../../../CringePlayer.js';
import QuestionState from './QuestionState.js';

class PlayerState extends CringePlayer {
  constructor(id, name, avatarUrl, isVip,) {
    super(id, name, avatarUrl, isVip);

    this.points = 0;
  }
}

schema.defineTypes(PlayerState, {
  points: 'number',
  isAnswered: 'boolean',
  question: QuestionState,
});

export default PlayerState;
