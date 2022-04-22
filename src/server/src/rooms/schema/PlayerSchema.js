import schema from '@colyseus/schema';

class Player extends schema.Schema {
  constructor(id, name) {
    super();

    this.id = id;
    this.name = name;
  }
}

schema.defineTypes(Player, {
  id: 'string',
  name: 'string',
});

export default Player;
