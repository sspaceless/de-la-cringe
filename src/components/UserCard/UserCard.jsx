import React from 'react';
import propTypes from 'prop-types';

function UserCard({ avatarUrl, username }) {
  return (
    <div>
      <img src={avatarUrl} alt="avatar" />
      <h4>{username}</h4>
      <button type="button" onClick={console.log('exit')}>Exit</button>
    </div>
  );
}

UserCard.propTypes = {
  avatarUrl: propTypes.string.isRequired,
  username: propTypes.string.isRequired
};

export default UserCard;
