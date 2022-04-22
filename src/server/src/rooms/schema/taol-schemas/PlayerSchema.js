import * as schema from '@colyseus/schema';

const { Schema } = schema;
class Player extends Schema {
  constructor(id, name, isVip) {
    super();

    this.id = id;
    this.name = name;
    this.isVip = isVip;
  }
}

schema.defineTypes(Player, {
  id: 'string',
  name: 'string',
  isVip: 'boolean',
});

export default Player;
