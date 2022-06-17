import * as schema from '@colyseus/schema';
import MGPlayer from './MGPlayer.js';
import MGRound from './MGRound.js';
import { Stages } from '../MGConfig.js';

class MGState extends schema.Schema {
  constructor(themes) {
    super();

    this.answeredQuestions = new schema.ArraySchema();
    this.curQuestionAnswers = new schema.ArraySchema();

    this.themes = new schema.ArraySchema(...themes);
    this.availableThemes = new schema.ArraySchema(...themes);

    this.players = new schema.MapSchema();

    this.stage = Stages.LOBBY;

    this.isExtra = false;
  }
}

schema.defineTypes(MGState, {
  themes: { array: 'string' },
  availableThemes: { array: 'string' },
  players: { map: MGPlayer },
  host: MGPlayer,
  stage: 'string',
  answeringClientId: 'string',
  round: MGRound,
  questionWaitUntil: 'number',
  answerWaitUntil: 'number',
  startingUntil: 'number',
  showingResultsUntil: 'number',
  fileShowingWaitUntil: 'number',
  lastAnsweredUserId: 'string',
  isExtra: 'boolean',
  curQuestionAnswers: { array: 'string' },
  winner: MGPlayer
});

export default MGState;
