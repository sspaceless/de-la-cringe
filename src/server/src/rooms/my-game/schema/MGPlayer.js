import * as schema from '@colyseus/schema';
import CringePlayer from '../../../CringePlayer.js';

class MGPlayer extends CringePlayer {
  constructor(id, username, isVip, avatarUrl) {
    super(id, username, avatarUrl, isVip);

    this.points = 0;
    this.lastAnswerTime = 0;
    this.answers = new schema.ArraySchema();
  }
}

schema.defineTypes(MGPlayer, {
  points: 'number',
  lastAnswerTime: 'number',
  answers: { array: Object }
});

export default MGPlayer;
