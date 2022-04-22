import * as schema from '@colyseus/schema';
import Player from './PlayerSchema.js';

const { Schema, ArraySchema } = schema;

class TaolRoomState extends Schema {
  constructor() {
    super();
    this.players = new ArraySchema();
  }
}

schema.defineTypes(TaolRoomState, { players: { array: Player } });

export default TaolRoomState;
