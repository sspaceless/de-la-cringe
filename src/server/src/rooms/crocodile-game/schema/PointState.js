import * as schema from '@colyseus/schema';

const { Schema } = schema;

class PointState extends Schema {
  constructor(point) {
    super();
    const { x, y } = point;
    this.x = x;
    this.y = y;
  }
}

schema.defineTypes(PointState, { x: 'number', y: 'number' });

export default PointState;
