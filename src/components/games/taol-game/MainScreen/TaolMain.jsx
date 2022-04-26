import propTypes from 'prop-types';
import FirstStage from '../FirstStage/FirstStage';
import { sendMessage } from '../../../../modules/room-connect';

function TaolMain({ roomId, roomState }) {
  const { players, clientId, stage } = roomState;
  const isVip = players.find((player) => player.id === clientId).isVip === true;
  const isButtonActive = isVip && players.length >= 3;

  const buttonClickHandler = () => {
    sendMessage('STAGE', { stage: 'FIRST' });
  };

  let content = (
    <div>
      <h2>{`Room ID: ${roomId}`}</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {`${player.isVip ? 'VIP:' : ''} ${player.name}`}
          </li>
        ))}
      </ul>
      {isVip && <button type="button" disabled={!isButtonActive} onClick={buttonClickHandler}>Start!</button>}
    </div>
  );

  if (stage === 'FIRST') {
    content = <FirstStage roomState={roomState} roomId={roomId} />;
  }

  return (content);
}

TaolMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array).isRequired,
    clientId: propTypes.string.isRequired,
    stage: propTypes.string.isRequired,
  }).isRequired,
};

export default TaolMain;
