const FILES_URL = 'http://localhost:3002/files/games/my-game/questions';
const Themes = ['Аніме', 'Ігри', 'Логотипи', 'Музика', 'Кінематограф', 'Столиці', 'Загадкові речі'];

const MessageTypes = {
  START: 'Start',
  ANSWER_REQUEST: 'Answer request',
  ANSWER_REQUEST_ACCEPT: 'Answer request accept',
  ANSWER_DECISION: 'Answer decision',
  QUESTION_SELECT: 'Question select',
};

const Settings = {
  ANSWER_RELOAD: 5,
  MAX_PRICE: 800,
  PRICES: [100, 200, 300, 500, 800],
  TIME_FOR_QUESTION: 60 * 1000,
  TIME_FOR_ANSWER_WAITING: 45 * 1000,
  TIME_FOR_ANSWER_DECISION: 3 * 1000,
  TIME_FOR_ANSWER_SHOWING: 5 * 1000,
  TIME_FOR_START: 5 * 1000,
  TIME_FOR_RESULTS_SHOWING: 30 * 1000,
  EXTRA_MULTIPLIER: 1.5,
};

const Stages = {
  LOBBY: 'Lobby',
  STARTING: 'Starting',
  ANSWER_WAITING: 'Waiting for an answer',
  QUESTION_SHOWING: 'Showing question',
  QUESTION_FILE_SHOWING: 'Showing question file',
  ANSWER_SHOWING: 'Answer showing',
  QUESTION_SELECTION: 'Question selection',
  ROUND_RESULTS_SHOWING: 'Round results showing',
  GAME_RESULTS: 'Game results'
};

const stageIcons = ['lobby', 'map', 'station', 'results', 'end'];

const ClientSettings = {
  FUEL_BAR_MULTIPLIER: 0.3,
};

// eslint-disable-next-line import/prefer-default-export
export { Themes, MessageTypes, Settings, Stages, stageIcons, FILES_URL, ClientSettings };
