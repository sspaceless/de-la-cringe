import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import PlayerStatList from '../PlayersStatList/PlayerStatList';
import PlayersList from '../../taol-game/PlayersList/PlayersList';
import Results from '../Results/Results';
import Canvas from '../Canvas/Canvas';
import Timer from '../../../Timer/Timer';
import Chat from '../Chat/Chat';
import * as constants from '../config';
import styles from './CrocodileMain.module.css';

function CrocodileMain(props) {
  const { roomId, roomState } = props;
  const {
    word,
    stage,
    timer,
    canvas,
    players,
    messages,
    clientId,
    queueNumber,
  } = roomState;

  const isSpectator = players.find((item, index) => item.id === clientId && index !== queueNumber);
  const isButtonActive = !isSpectator && players.length >= 3;
  const painter = players[queueNumber];

  const startGameButtonClickHandler = () => {
    sendMessage(constants.STAGE_MESSAGE_TYPE, { stage: constants.GAME_STAGE });
  };

  const alarmHandler = !isSpectator
    ? () => {
      sendMessage(constants.SKIP_DRAWING_MESSAGE_TYPE);
    }
    : undefined;

  const taskSpectator = (
    <p>{`Відгадай, що намалював ${painter.name}:`}</p>
  );

  const taskPainter = (
    <p>{`Намалюй ${word ?? '( шукаємо слово... )'}` }</p>
  );

  const gameContent = (
    <>
      {(isSpectator)
        ? taskSpectator
        : taskPainter}
      {!isSpectator && <Timer untilDate={timer} onAlarm={alarmHandler} format="ss" />}
      <div className={styles['game-wrapper']}>
        <Canvas canvasState={canvas} isSpectator={isSpectator} />
        <div className={styles['side-bar']}>
          <PlayerStatList players={players} />
          <Chat messages={messages} isSpectator={isSpectator} players={players} />
        </div>
      </div>
    </>
  );

  const defaultContent = (
    <>
      <h2>{`ID кімнати: ${roomId}`}</h2>
      <PlayersList players={players} />
      <p>Мінімальна кількість гравців - 3</p>
      {!isSpectator && <button type="button" disabled={!isButtonActive} onClick={startGameButtonClickHandler}>Грати</button>}
    </>
  );

  switch (stage) {
    case constants.GAME_STAGE:
      return gameContent;
    case constants.RESULTS_STAGE:
      return <Results roomState={roomState} />;
    default:
      return defaultContent;
  }
}

export default CrocodileMain;

CrocodileMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    word: propTypes.string,
    timer: propTypes.string,
    stage: propTypes.string,
    clientId: propTypes.string,
    messages: propTypes.shape(Array),
    players: propTypes.instanceOf(Array),
    queueNumber: propTypes.number,
    canvas: propTypes.shape({
      points: propTypes.instanceOf(Array),
      isDrawing: propTypes.bool,
    }),
  }).isRequired,
};
