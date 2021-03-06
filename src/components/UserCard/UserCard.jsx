import React, { useContext } from 'react';
import propTypes from 'prop-types';
import userContext from '../userContext';
import { quickGet } from '../../modules/quickfetch';
import Config from '../../config';

function UserCard({ avatar, username }) {
  const { reloadUserState } = useContext(userContext);

  const logout = async () => {
    const result = await quickGet(new URL('/api/users/logoutFromAccount', Config.API_URL));

    if (result.success) {
      await reloadUserState();
    }
  };

  return (
    <div>
      <img src={avatar} alt="avatar" />
      <h4>{username}</h4>
      <button type="button" onClick={logout}>Exit</button>
    </div>
  );
}

UserCard.propTypes = {
  avatar: propTypes.string.isRequired,
  username: propTypes.string.isRequired
};

export default UserCard;
