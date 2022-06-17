import * as schema from '@colyseus/schema';
import CringePlayer from './CringePlayer.js';

const { Schema, ArraySchema } = schema;

class CringeState extends Schema {
  constructor() {
    super();
    this.players = new ArraySchema();
  }

  addPlayer(player) {
    this.players.push(player);
  }

  deletePlayer(playerId) {
    const leavingPlayer = this.players.find((item) => item.id === playerId);
    const isLeavingPlayerVip = leavingPlayer.isVip;

    this.players.splice(this.players.indexOf(leavingPlayer), 1);

    if (isLeavingPlayerVip && this.players.length >= 1) {
      this.players[0].isVip = true;
    }
  }

  resetTimer(seconds = 59) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    this.timer = date.toISOString();
  }
}

schema.defineTypes(CringeState, {
  players: { array: CringePlayer },
  timer: 'string',
});

export default CringeState;
