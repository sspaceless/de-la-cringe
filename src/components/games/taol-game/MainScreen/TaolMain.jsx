import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';

function TaolMain({ roomId, roomState }) {
  const { players, clientId } = roomState;
  const isVip = players.find((player) => player.id === clientId).isVip === true;
  const isButtonActive = isVip && players.length >= 3;

  const buttonClickHandler = () => {
    sendMessage('stage', { stage: 'fisrt' });
  };

  const playersList = (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          {`${player.isVip ? 'VIP:' : ''} ${player.name}`}
        </li>
      ))}
    </ul>
  );

  const startButton = isVip && <button type="button" disabled={!isButtonActive} onClick={buttonClickHandler}>Start!</button>;

  return (
    <div>
      <h2>{`Room ID: ${roomId}`}</h2>
      {playersList}
      {startButton}
    </div>
  );
}

TaolMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array).isRequired,
    clientId: propTypes.string.isRequired
  }).isRequired,
};

export default TaolMain;
