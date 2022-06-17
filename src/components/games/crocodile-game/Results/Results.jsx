import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PlayerStatList from '../PlayersStatList/PlayerStatList';

function Results(props) {
  const { roomState } = props;
  const { players } = roomState;

  const navigate = useNavigate();

  const endGameButtonClickHandler = () => {
    navigate('/');
  };

  return (
    <>
      <PlayerStatList players={players} />
      <button type="button" onClick={endGameButtonClickHandler}>Додому</button>
    </>
  );
}

export default Results;

Results.propTypes = {
  roomState: PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    players: PropTypes.instanceOf(Array).isRequired,
    questionNumber: PropTypes.number.isRequired,
  }).isRequired,
};
