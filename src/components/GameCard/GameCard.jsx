import React from 'react';
import PropTypes from 'prop-types';

function GameCard(props) {
  const { image, name, description, available } = props;

  return (
    // eslint-disable-next-line no-unneeded-ternary
    <div available={available ? 'true' : undefined}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

GameCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired
};

export default GameCard;
