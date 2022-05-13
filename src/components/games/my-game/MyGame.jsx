import React, { useContext } from 'react';
import Lobby from './Lobby/Lobby';
import MGContext from './MGContext';
import { States } from './MGConfig';
import StartingCountPage from './StartingCountPage/StartingCountPage';
import QuestionSelectionPage from './QuestionSelectionPage/QuestionSelectionPage';
import QuestionShowingPage from './QuestionShowingPage/QuestionShowingPage';

function MyGame() {
  const { stage } = useContext(MGContext);

  let page;

  switch (stage) {
    case States.LOBBY:
      page = <Lobby />;
      break;

    case States.STARTING:
      page = <StartingCountPage />;
      break;

    case States.QUESTION_SELECTION:
      page = <QuestionSelectionPage />;
      break;

    case States.QUESTION_SHOWING:
    case States.ANSWER_WAITING:
    case States.ANSWER_SHOWING:
      page = <QuestionShowingPage />;
      break;

    default:
      page = <div>{stage}</div>;
      break;
  }

  return (
    <div>
      {page}
    </div>
  );
}

export default MyGame;
