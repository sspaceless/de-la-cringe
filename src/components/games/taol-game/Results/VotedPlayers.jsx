import PropTypes from 'prop-types';

function VotedPlayers(props) {
  const { players } = props;

  return (
    players.map((item) => (
      <div key={item.id}>
        <img alt="avatar" src={item.avatar} />
      </div>
    ))
  );
}

VotedPlayers.propTypes = { players: PropTypes.instanceOf(Array).isRequired, };

export default VotedPlayers;
