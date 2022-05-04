import * as schema from '@colyseus/schema';
import CringePlayer from '../../schema/CringePlayer.js';
import QuestionState from './QuestionState.js';

class PlayerState extends CringePlayer {
  constructor(id, name, isVip) {
    super(id, name, isVip);

    this.points = 0;
    this.isAnswered = false;
  }
}

schema.defineTypes(PlayerState, {
  points: 'number',
  isAnswered: 'boolean',
  question: QuestionState,
});

export default PlayerState;
