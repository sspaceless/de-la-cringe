import * as schema from '@colyseus/schema';
import PointState from './PointState.js';

const { Schema, ArraySchema } = schema;

class CanvasState extends Schema {
  constructor() {
    super();
    this.points = new ArraySchema();
  }

  resetPoints() {
    this.points = new ArraySchema();
  }

  setPoints(points) {
    points.forEach((item) => {
      const point = new PointState(item);
      this.points.push(point);
    });
  }

  setLineWidth(lineWidth) {
    this.lineWidth = lineWidth;
  }

  setStrokeStyle(strokeStyle) {
    this.strokeStyle = strokeStyle;
  }

  setIsDrawing(isDrawing) {
    this.isDrawing = isDrawing;
  }
}

schema.defineTypes(CanvasState, {
  points: { array: PointState },
  lineWidth: 'string',
  strokeStyle: 'string',
  isDrawing: 'boolean'
});

export default CanvasState;
