import * as schema from '@colyseus/schema';
import MGPrices from './MGPrices.js';

class MGRound extends schema.Schema {
  constructor(themes) {
    super();

    this.questions = new schema.ArraySchema();

    this.themes = new schema.MapSchema();
    themes.forEach((topic) => this.themes.set(topic, new MGPrices()));
  }
}

schema.defineTypes(MGRound, {
  themes: { map: MGPrices },
  questions: { array: Object },
  curQuestion: Object
});

export default MGRound;
