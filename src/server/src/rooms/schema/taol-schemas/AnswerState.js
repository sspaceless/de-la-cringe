import * as schema from '@colyseus/schema';

const { Schema, ArraySchema } = schema;

class AnswerState extends Schema {
  constructor({ answer, isTruth }) {
    super();
    this.answer = answer;
    this.isTruth = isTruth;
    this.votes = new ArraySchema();
  }
}

schema.defineTypes(AnswerState, {
  isTruth: 'boolean',
  answer: 'string',
  votes: { array: 'string' },
});

export default AnswerState;
