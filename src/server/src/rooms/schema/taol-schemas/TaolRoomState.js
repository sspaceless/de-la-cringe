import * as schema from '@colyseus/schema';
import Player from './PlayerSchema.js';

const { Schema, ArraySchema } = schema;

class TaolRoomState extends Schema {
  constructor() {
    super();
    this.players = new ArraySchema();
    this.stage = 'preparation'
  }
}

schema.defineTypes(TaolRoomState, { players: { array: Player }, stage: 'string' });

export default TaolRoomState;
