import * as schema from '@colyseus/schema';
import PlayerState from './PlayerState.js';
import QuestionState from './QuestionState.js';

const { Schema, ArraySchema } = schema;

class TaolRoomState extends Schema {
  constructor() {
    super();
    this.players = new ArraySchema();
    this.questions = new ArraySchema();
    this.stage = 'preparation';
  }
}

schema.defineTypes(TaolRoomState, {
  stage: 'string',
  players: { array: PlayerState },
  questions: { array: QuestionState }
});

export default TaolRoomState;
