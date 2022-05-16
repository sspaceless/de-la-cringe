import * as schema from '@colyseus/schema';
import CringeState from '../../../CringeState.js';

class TaolRoomState extends CringeState {
  constructor() {
    super();
    this.stage = 'preparation';
    this.questionNumber = 0;
  }

  setStage(stage) {
    this.stage = stage;
  }

  nextQuestion() {
    this.questionNumber += 1;
  }
}

schema.defineTypes(TaolRoomState, {
  stage: 'string',
  questionNumber: 'number',
});

export default TaolRoomState;
