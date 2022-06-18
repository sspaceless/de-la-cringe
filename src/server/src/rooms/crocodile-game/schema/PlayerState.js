import * as schema from '@colyseus/schema';
import CringePlayer from '../../../CringePlayer.js';

class PlayerState extends CringePlayer {
  constructor(id, name, avatar, isVip,) {
    super(id, name, avatar, isVip);
    this.points = 0;
  }

  addPoints(points) {
    this.points += points;
  }
}

schema.defineTypes(PlayerState, { points: 'number' });

export default PlayerState;
