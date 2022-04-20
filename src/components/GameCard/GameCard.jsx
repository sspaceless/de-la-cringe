import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function GameCard(props) {
  const { image, name, gameId, description } = props;

  return (
    <Link to={`/games/${gameId}`}>
      <div>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

GameCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default GameCard;
