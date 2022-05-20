const Themes = ['Anime', 'Games'];

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
  TIME_FOR_ANSWER_WAITING: 5 * 1000, // 45
  TIME_FOR_ANSWER_DECISION: 0.5 * 1000, // 1.5
  TIME_FOR_ANSWER_SHOWING: 1 * 1000, // 10
  TIME_FOR_START: 0 * 1000, // 5
  TIME_FOR_ROUND_END: 5 * 1000,
  EXTRA_MULTIPLIER: 1.5,
};

const Stages = {
  LOBBY: 'Lobby',
  STARTING: 'Starting',
  ANSWER_WAITING: 'Waiting for an answer',
  QUESTION_SHOWING: 'Showing question',
  ANSWER_SHOWING: 'Answer showing',
  ROUND_END: 'Round end',
  QUESTION_SELECTION: 'Question selection',
  ROUND_RESULTS_SHOWING: 'Round results showing',
};

// eslint-disable-next-line import/prefer-default-export
export { Themes, MessageTypes, Settings, Stages };
