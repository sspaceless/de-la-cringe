import * as schema from '@colyseus/schema';
import AnswerState from './AnswerState.js';

const { Schema, MapSchema } = schema;

class QuestionState extends Schema {
  constructor({ id, personalQuestion, publicQuestion, isUsed }) {
    super();
    this.id = id;
    this.personalQuestion = personalQuestion;
    this.publicQuestion = publicQuestion;
    this.isUsed = isUsed;
    this.answers = new MapSchema();
  }
}

schema.defineTypes(QuestionState, {
  id: 'number',
  personalQuestion: 'string',
  publicQuestion: 'string',
  isUsed: 'boolean',
  answers: { map: AnswerState }
});

export default QuestionState;
