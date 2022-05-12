import React from 'react';
import PropTypes from 'prop-types';

function PlayerMiniature({ avatarUrl, username, isVip = false }) {
  return (
    <div>
      <img src={avatarUrl} alt="Player's avatar" />
      <h1>{username}</h1>
      {isVip
        && <h1>⭐</h1>}
    </div>
  );
}

PlayerMiniature.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isVip: PropTypes.bool
};

PlayerMiniature.defaultProps = { isVip: false };

export default PlayerMiniature;
