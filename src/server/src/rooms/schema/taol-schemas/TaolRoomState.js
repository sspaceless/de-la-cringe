import * as schema from '@colyseus/schema';
import PlayerState from './PlayerState.js';

const { Schema, ArraySchema } = schema;

class TaolRoomState extends Schema {
  constructor() {
    super();
    this.players = new ArraySchema();
    this.stage = 'preparation';
    this.questionNumber = 0;
  }
}

schema.defineTypes(TaolRoomState, {
  stage: 'string',
  players: { array: PlayerState },
  questionNumber: 'number',
});

export default TaolRoomState;
