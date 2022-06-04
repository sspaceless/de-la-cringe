import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import Canvas from '../Canvas/Canvas';
import CanvasSpectator from '../CanvasSpectator/CanvasSpectator';
import * as constants from '../config';

function CrocodileMain(props) {
  const { roomId, roomState } = props;
  const { players, clientId, stage, canvas } = roomState;
  const isPlayerVip = players.find((player) => player.id === clientId).isVip === true;
  const isButtonActive = isPlayerVip && players.length >= 3;

  const buttonClickHandler = () => {
    sendMessage(constants.STAGE_MESSAGE_TYPE, { stage: constants.GAME_STAGE });
  };

  const content = (
    <div>
      <h2>{`ID кімнати: ${roomId}`}</h2>
      {isPlayerVip && <button type="button" disabled={!isButtonActive} onClick={buttonClickHandler}>Грати</button>}
    </div>
  );

  if (stage === constants.GAME_STAGE && isPlayerVip) {
    return <Canvas />;
  }

  if (stage === constants.GAME_STAGE && !isPlayerVip) {
    return <CanvasSpectator canvasState={canvas} />;
  }

  return content;
}

export default CrocodileMain;

CrocodileMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array),
    clientId: propTypes.string,
    stage: propTypes.string,
    canvas: propTypes.shape({
      points: propTypes.instanceOf(Array).isRequired,
      isDrawing: propTypes.bool.isRequired,
    }),
  }).isRequired,
};
