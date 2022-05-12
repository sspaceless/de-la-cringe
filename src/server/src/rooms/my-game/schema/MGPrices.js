import * as schema from '@colyseus/schema';

class MGPrices extends schema.Schema {
  constructor() {
    super();

    this.available = new schema.ArraySchema(100, 200, 300, 500, 800);
  }
}

schema.defineTypes(MGPrices, { available: { array: 'number' } });

export default MGPrices;
