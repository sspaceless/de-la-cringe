import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import Canvas from '../Canvas/Canvas';
import CanvasSpectator from '../CanvasSpectator/CanvasSpectator';
import Chat from '../Chat/Chat';
import * as constants from '../config';

function CrocodileMain(props) {
  const { roomId, roomState } = props;
  const { players, clientId, queueNumber, stage, canvas, messages } = roomState;
  const isSpectator = players.find((item, index) => item.id === clientId && index !== queueNumber);
  const isPlayerVip = players.find((item) => item.id === clientId).isVip === true;
  const isButtonActive = isPlayerVip && players.length >= 3;

  const buttonClickHandler = () => {
    sendMessage(constants.STAGE_MESSAGE_TYPE, { stage: constants.GAME_STAGE });
  };

  switch (stage) {
    case constants.GAME_STAGE:
      return (
        <>
          {(isSpectator)
            ? <CanvasSpectator canvasState={canvas} />
            : <Canvas />}
          <Chat messages={messages} isSpectator={isSpectator} players={players} />
        </>
      );
    case constants.RESULTS_STAGE:
    default:
      return (
        <>
          <h2>{`ID кімнати: ${roomId}`}</h2>
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
    canvas: propTypes.shape({
      points: propTypes.instanceOf(Array),
      isDrawing: propTypes.bool,
    }),
  }).isRequired,
};
