import * as schema from '@colyseus/schema';
import MGPrices from './MGPrices.js';
import MGQuestion from './MGQuestion.js';

class MGRound extends schema.Schema {
  constructor(themes, num) {
    super();

    this.num = num;
    this.questions = new schema.ArraySchema();

    this.themes = new schema.MapSchema();
    themes.forEach((topic) => this.themes.set(topic, new MGPrices()));
  }
}

schema.defineTypes(MGRound, {
  num: 'number',
  themes: { map: MGPrices },
  questions: { array: MGQuestion },
  curQuestion: MGQuestion
});

export default MGRound;
