import * as schema from '@colyseus/schema';
import CringeState from '../../../CringeState.js';

class CrocodileRoomState extends CringeState {
  setCanvasState(canvasState) {
    this.canvasState = canvasState;
  }
}

schema.defineTypes({ canvasState: 'string', });

export default CrocodileRoomState;
