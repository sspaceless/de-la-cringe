import * as schema from '@colyseus/schema';
import MGPlayer from './MGPlayer.js';
import MGRound from './MGRound.js';
import { States } from '../MGConfig.js';

class MGState extends schema.Schema {
  constructor(themes) {
    super();

    this.answeredQuestions = new schema.ArraySchema();
    this.themes = new schema.ArraySchema(...themes);
    this.availableThemes = new schema.ArraySchema(...themes);

    this.players = new schema.MapSchema();

    this.stage = States.LOBBY;

    this.isExtra = false;
  }
}

schema.defineTypes(MGState, {
  themes: { array: 'string' },
  availableThemes: { array: 'string' },
  questionTimerDate: 'number',
  players: { map: MGPlayer },
  host: MGPlayer,
  stage: 'string',
  answeringClientId: 'string',
  round: MGRound,
  questionWaitUntil: 'number',
  answerWaitUntil: 'number',
  lastAnsweredUserId: 'string',
  isExtra: 'boolean',
});

export default MGState;
