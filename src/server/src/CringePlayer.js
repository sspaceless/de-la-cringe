import * as schema from '@colyseus/schema';

const { Schema } = schema;

class CringePlayer extends Schema {
  constructor(id, name, avatar, isVip) {
    super();

    this.id = id;
    this.name = name;
    this.isVip = isVip;
    this.avatar = avatar;
  }
}

schema.defineTypes(CringePlayer, {
  id: 'string',
  name: 'string',
  isVip: 'boolean',
  avatar: 'string',
});

export default CringePlayer;
