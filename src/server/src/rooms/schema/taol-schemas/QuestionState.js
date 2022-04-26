import * as schema from '@colyseus/schema';

const { Schema } = schema;

class QuestionState extends Schema {
  constructor({ id, personalQuestion, publicQuestion, isUsed }) {
    super();

    this.id = id;
    this.personalQuestion = personalQuestion;
    this.publicQuestion = publicQuestion;
    this.isUsed = isUsed;
  }
}

schema.defineTypes(QuestionState, {
  id: 'number',
  personalQuestion: 'string',
  publicQuestion: 'string',
  isUsed: 'boolean'
});

export default QuestionState;
