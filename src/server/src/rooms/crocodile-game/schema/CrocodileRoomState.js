import * as schema from '@colyseus/schema';
import CringeState from '../../../CringeState.js';
import CanvasState from './CanvasState.js';
import MessageState from './MessageState.js';

const { ArraySchema } = schema;

class CrocodileRoomState extends CringeState {
  constructor() {
    super();
    this.canvas = new CanvasState();
    this.messages = new ArraySchema();
    this.stage = 'PREPARATION';
    this.queueNumber = 0;
  }

  setStage(stage) {
    this.stage = stage;
  }

  nextPlayer() {
    this.queueNumber += 1;
  }

  setWord(word) {
    this.word = word.toUpperCase();
  }

  resetQueue() {
    this.queueNumber = 0;
  }

  setCanvasState(canvasState) {
    const { points, lineWidth, strokeStyle, isDrawing } = canvasState;
    this.canvas.setPoints(points);
    this.canvas.setIsDrawing(isDrawing);
    this.canvas.setStrokeStyle(strokeStyle);
    this.canvas.setLineWidth(lineWidth);
  }
}

schema.defineTypes(CrocodileRoomState, {
  canvas: CanvasState,
  messages: { array: MessageState },
  queueNumber: 'number',
  stage: 'string',
  word: 'string',
});

export default CrocodileRoomState;
