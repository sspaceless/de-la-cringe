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
  TIME_FOR_QUESTION: 60 * 1000,
  TIME_FOR_ANSWER_WAITING: 45 * 1000,
  TIME_FOR_ANSWER: 10 * 1000,
};

const States = {
  LOBBY: 'Lobby',
  STARTING: 'Starting',
  ANSWER_WAITING: 'Waiting for an answer',
  THEME_SELECTION: 'Theme selection',
  QUESTION_SHOWING: 'Showing question',
  ROUND_END: 'Round end',
  QUESTION_SELECTION: 'Question selection',
};

// eslint-disable-next-line import/prefer-default-export
export { Themes, MessageTypes, Settings, States };
