import * as schema from '@colyseus/schema';
import { Settings } from '../MGConfig.js';

class MGPrices extends schema.Schema {
  constructor() {
    super();

    this.available = new schema.ArraySchema(...Settings.PRICES);
  }
}

schema.defineTypes(MGPrices, { available: { array: 'number' } });

export default MGPrices;
