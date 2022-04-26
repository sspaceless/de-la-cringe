import * as schema from '@colyseus/schema';

const { Schema } = schema;

class PlayerState extends Schema {
  constructor(id, name, isVip) {
    super();

    this.id = id;
    this.name = name;
    this.isVip = isVip;
  }
}

schema.defineTypes(PlayerState, {
  id: 'string',
  name: 'string',
  isVip: 'boolean',
  questionId: 'number',
});

export default PlayerState;
