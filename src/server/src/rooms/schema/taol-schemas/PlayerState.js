import * as schema from '@colyseus/schema';
import QuestionState from './QuestionState.js';

const { Schema } = schema;

class PlayerState extends Schema {
  constructor(id, name, isVip) {
    super();

    this.id = id;
    this.name = name;
    this.isVip = isVip;
    this.points = 0;
    this.isAnswered = false;
  }
}

schema.defineTypes(PlayerState, {
  id: 'string',
  name: 'string',
  isVip: 'boolean',
  points: 'number',
  isAnswered: 'boolean',
  question: QuestionState,
});

export default PlayerState;
