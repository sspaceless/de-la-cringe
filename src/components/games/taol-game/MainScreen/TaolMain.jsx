import propTypes from 'prop-types';

function TaolMain({ roomId, roomState }) {
  const { players } = roomState;

  return (
    <div>
      <h2>{`Room ID: ${roomId}`}</h2>
      {players.map((player) => (
        <div key={player.id}>
          {player.isVip && 'VIP:'}
          <p>{player.name}</p>
        </div>
      ))}
    </div>
  );
}

TaolMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({ players: propTypes.instanceOf(Array).isRequired }).isRequired,
};

export default TaolMain;
