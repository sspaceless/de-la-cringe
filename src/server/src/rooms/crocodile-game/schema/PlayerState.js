import * as schema from '@colyseus/schema';
import CringePlayer from '../../../CringePlayer.js';

class PlayerState extends CringePlayer {
  constructor(id, name, avatarUrl, isVip,) {
    super(id, name, avatarUrl, isVip);
    this.points = 0;
  }

  addPoints(points) {
    this.points += points;
  }
}

schema.defineTypes(PlayerState, {});

export default PlayerState;
