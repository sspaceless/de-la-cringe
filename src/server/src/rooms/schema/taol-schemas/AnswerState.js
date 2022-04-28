import * as schema from '@colyseus/schema';

const { Schema } = schema;

class AnswerState extends Schema {
  constructor({ answer, isTruth }) {
    super();
    this.answer = answer;
    this.isTruth = isTruth;
  }
}

schema.defineTypes(AnswerState, {
  isTruth: 'boolean',
  answer: 'string'
});

export default AnswerState;
