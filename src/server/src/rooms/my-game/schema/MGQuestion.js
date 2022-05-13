import * as schema from '@colyseus/schema';

class MGQuestion extends schema.Schema {
  constructor(text, theme, price) {
    super();

    this.text = text;
    this.theme = theme;
    this.price = price;
  }
}

schema.defineTypes(MGQuestion, {
  text: 'string',
  price: 'number',
  theme: 'string',
});

export default MGQuestion;
