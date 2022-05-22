/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import Lobby from '../Lobby/Lobby';
import MGContext from '../MGContext';
import { Stages, stageIcons } from '../MGConfig';
import config from '../../../../config.json';
import StartingCountPage from '../StartingCountPage/StartingCountPage';
import QuestionSelectionPage from '../QuestionSelectionPage/QuestionSelectionPage';
import QuestionShowingPage from '../QuestionShowingPage/QuestionShowingPage';
import PlayerMiniature from '../PlayerMiniature/PlayerMiniature';
import styles from './MyGame.module.css';

function MyGame() {
  const { stage, state } = useContext(MGContext);

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

    case Stages.QUESTION_SHOWING:
    case Stages.ANSWER_WAITING:
    case Stages.ANSWER_SHOWING:
      page = <QuestionShowingPage />;
      selectedIcon = 'station';
      break;

    default:
      page = <div>{stage}</div>;
      break;
  }

  const iconsList = stageIcons.map((icon) => (
    <div className={styles.iconWrapper} key={icon} data-selected={selectedIcon === icon ? 1 : 0}>
      <img className={styles.icon} alt={icon} src={`${config.apiUrl}\\files\\games\\my-game\\stages\\${icon}.svg`} />
    </div>
  ));

  const playersList = [];
  playersList.push(
    <PlayerMiniature
      key={state.host.id}
      username={state.host.name}
      avatarUrl={state.host.avatarUrl}
      isVip
    />
  );
  state.players.forEach((p) => playersList.push(
    <PlayerMiniature
      key={p.id}
      username={p.name}
      avatarUrl={p.avatarUrl}
      points={p.points}
    />
  ));

  return (
    <>
      <header>
        Rocket/Company
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

        <div className={styles.players}>
          {playersList}
        </div>
      </div>
    </>
  );
}

export default MyGame;
