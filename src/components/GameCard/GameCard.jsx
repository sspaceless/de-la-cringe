import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../LinkButton/LinkButton';
import { quickGet } from '../../modules/quickfetch';
import Timer from '../Timer/Timer';
import userContext from '../userContext';

function GameCard(props) {
  const { gameInfo, isAuthorized } = props;
  const { image, name, description, type, gameId, untilDate = undefined } = gameInfo;

  const { reloadUserState } = useContext(userContext);

  let url;
  let buttonText;

  if (type === 'payable') {
    url = `games/buy/${gameId}`;
    buttonText = 'BUY';
  } else {
    url = `games/${gameId}`;
    buttonText = 'PLAY';
  }

  const getFreeTrial = async () => {
    await quickGet(`http://localhost:3002/api/games/grantFreeTrial?gameId=${encodeURIComponent(gameId)}`);
    await reloadUserState();
  };
  const errorMessage = () => {
    // eslint-disable-next-line no-alert
    alert('Please Sign In');
  };

  return (
    <div style={{ border: '1px solid black' }}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      {(type === 'trial')
        && <Timer untilDate={untilDate} onAlarm={reloadUserState} format="hh:mm:ss" />}
      {(type === 'payable' && !untilDate)
        && <button type="button" onClick={isAuthorized ? getFreeTrial : errorMessage}>FREE TRIAL</button>}
      <LinkButton to={url}>{buttonText}</LinkButton>
    </div>
  );
}

GameCard.propTypes = {
  gameInfo: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    untilDate: PropTypes.instanceOf(Date)
  }).isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

export default GameCard;
