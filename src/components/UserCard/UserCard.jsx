import React from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { quickGet } from '../../modules/quickfetch';

function UserCard({ avatarUrl, username }) {
  const navigate = useNavigate();

  const logout = async () => {
    const result = await quickGet('http://localhost:3002/api/users/logoutFromAccount');

    if (result.success) {
      navigate(0);
    }
  };

  return (
    <div>
      <img src={avatarUrl} alt="avatar" />
      <h4>{username}</h4>
      <button type="button" onClick={logout}>Exit</button>
    </div>
  );
}

UserCard.propTypes = {
  avatarUrl: propTypes.string.isRequired,
  username: propTypes.string.isRequired
};

export default UserCard;
