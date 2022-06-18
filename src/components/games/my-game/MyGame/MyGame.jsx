/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react';
import Lobby from '../Lobby/Lobby';
import MGContext from '../MGContext';
import { Stages, stageIcons } from '../MGConfig';
import Config from '../../../../config';
import StartingCountPage from '../StartingCountPage/StartingCountPage';
import QuestionSelectionPage from '../QuestionSelectionPage/QuestionSelectionPage';
import QuestionShowingPage from '../QuestionShowingPage/QuestionShowingPage';
import PlayerMiniature from '../PlayerMiniature/PlayerMiniature';
import styles from './MyGame.module.css';
import RoundResultsPage from '../RoundResultsPage/RoundResultsPage';
import GameResults from '../GameResults/GameResults';

function MyGame() {
  const { stage, state } = useContext(MGContext);

  useEffect(() => {
    const url = `${Config.API_URL}/files/games/my-game`;

    document.documentElement.style.setProperty('--background-url', `url("${url}/background.svg")`);
    document.documentElement.style.setProperty('--fuel-background-url', `url("${url}/fuelBack.svg")`);
  }, []);

  let page;
  let selectedIcon;

  switch (stage) {
    case Stages.LOBBY:
      page = <Lobby />;
      selectedIcon = 'lobby';
      break;

    case Stages.STARTING:
      page = <StartingCountPage />;
      selectedIcon = 'lobby';
      break;

    case Stages.QUESTION_SELECTION:
      page = <QuestionSelectionPage />;
      selectedIcon = 'map';
      break;

    case Stages.QUESTION_FILE_SHOWING:
    case Stages.QUESTION_SHOWING:
    case Stages.ANSWER_WAITING:
    case Stages.ANSWER_SHOWING:
      page = <QuestionShowingPage />;
      selectedIcon = 'station';
      break;

    case Stages.ROUND_RESULTS_SHOWING:
      page = <RoundResultsPage />;
      selectedIcon = 'results';
      break;

    case Stages.GAME_RESULTS:
      page = <GameResults />;
      selectedIcon = 'end';
      break;

    default:
      page = <div>{stage}</div>;
      break;
  }

  const iconsList = stageIcons.map((icon) => (
    <div className={styles.iconWrapper} key={icon} data-selected={selectedIcon === icon ? 1 : 0}>
      <img className={styles.icon} alt={icon} src={`${Config.API_URL}/files/games/my-game/stages/${icon}.svg`} />
    </div>
  ));

  const playersList = [];
  playersList.push(
    <PlayerMiniature
      key={state.host.id}
      username={state.host.name}
      avatar={state.host.avatar}
      isVip
    />
  );
  state.players.forEach((p) => playersList.push(
    <PlayerMiniature
      key={p.id}
      username={p.name}
      avatar={p.avatar}
      points={p.points}
      isAnswering={state.answeringClientId === p.id}
    />
  ));

  return (
    <>
      <header>
        <img className={styles.logo} src={`${Config.API_URL}/files/games/my-game/ingamelogo.svg`} alt="logo" />
      </header>

      <div className={styles.mainContent}>
        <div className={styles.pages}>
          <div className={styles.icons}>
            {iconsList}
          </div>

          <div id="page" className={styles.page}>
            {page}
          </div>
        </div>

        <div className={styles.players} hidden={stage === Stages.GAME_RESULTS}>
          {playersList}
        </div>
      </div>
    </>
  );
}

export default MyGame;
