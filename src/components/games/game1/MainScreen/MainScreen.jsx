import propTypes from 'prop-types';

function Game1Main({ roomId }) {
  return <p>{`Room ID: ${roomId}`}</p>;
}

Game1Main.propTypes = { roomId: propTypes.string.isRequired };

export default Game1Main;
