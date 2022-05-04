import * as schema from '@colyseus/schema';

const { Schema } = schema;

class CringePlayer extends Schema {
  constructor(id, name, isVip, avatarUrl) {
    super();

    this.id = id;
    this.name = name;
    this.isVip = isVip;
    this.avatarUrl = avatarUrl;
  }
}

schema.defineTypes(CringePlayer, {
  id: 'string',
  name: 'string',
  isVip: 'boolean',
  avatarUrl: 'string',
});

export default CringePlayer;
