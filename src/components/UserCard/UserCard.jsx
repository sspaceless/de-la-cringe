import React, { useContext } from 'react';
import propTypes from 'prop-types';
import userContext from '../../userContext';
import { quickGet } from '../../modules/quickfetch';

function UserCard({ avatarUrl, username }) {
  const { reloadUserState } = useContext(userContext);

  const logout = async () => {
    const result = await quickGet('http://localhost:3002/api/users/logoutFromAccount');

    if (result.success) {
      await reloadUserState();
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
