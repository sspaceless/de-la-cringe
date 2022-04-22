import * as schema from '@colyseus/schema';
import Player from './PlayerSchema.js';

const { Schema, CollectionSchema } = schema;

class TaolRoomState extends Schema {
  constructor() {
    super();
    this.players = new CollectionSchema();
  }
}

schema.defineTypes(TaolRoomState, { players: { collection: Player } });

export default TaolRoomState;
