import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import Canvas from '../Canvas/Canvas';
import CanvasSpectator from '../CanvasSpectator/CanvasSpectator';
import Chat from '../Chat/Chat';
import PlayersList from '../../taol-game/PlayersList/PlayersList';
import * as constants from '../config';
import styles from './CrocodileMain.module.css';

function CrocodileMain(props) {
  const { roomId, roomState } = props;
  const {
    players,
    clientId,
    queueNumber,
    stage,
    canvas,
    messages,
    word,
  } = roomState;
  const isSpectator = players.find((item, index) => item.id === clientId && index !== queueNumber);
  const isPlayerVip = players.find((item) => item.id === clientId).isVip === true;
  const isButtonActive = isPlayerVip && players.length >= 3;
  const painter = players[queueNumber];

  const buttonClickHandler = () => {
    sendMessage(constants.STAGE_MESSAGE_TYPE, { stage: constants.GAME_STAGE });
  };

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
      <div className={styles['game-wrapper']}>
        {(isSpectator)
          ? <CanvasSpectator canvasState={canvas} />
          : <Canvas />}
        <div className={styles['side-bar']}>
          <div className={styles['players-list']}>
            {players.map((item) => (
              <div key={item.id} className={styles.player}>
                <img alt="avatar" src={item.avatarUrl} />
                <p>{`${item.name} - ${item.points}`}</p>
              </div>
            ))}
          </div>
          <Chat messages={messages} isSpectator={isSpectator} players={players} />
        </div>

      </div>
    </>
  );

  switch (stage) {
    case constants.GAME_STAGE:
      return (
        gameContent
      );
    case constants.RESULTS_STAGE:
    default:
      return (
        <>
          <h2>{`ID кімнати: ${roomId}`}</h2>
          <PlayersList players={players} />
          <p>Мінімальна кількість гравців - 3</p>
          {isPlayerVip && <button type="button" disabled={!isButtonActive} onClick={buttonClickHandler}>Грати</button>}
        </>
      );
  }
}

export default CrocodileMain;

CrocodileMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array),
    clientId: propTypes.string,
    queueNumber: propTypes.number,
    stage: propTypes.string,
    messages: propTypes.shape(Array),
    word: propTypes.string,
    timer: propTypes.string,
    canvas: propTypes.shape({
      points: propTypes.instanceOf(Array),
      isDrawing: propTypes.bool,
    }),
  }).isRequired,
};
