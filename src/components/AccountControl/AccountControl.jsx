import React, { useContext, useState } from 'react';
import userContext from '../userContext';
import { LogOutButton } from '../Buttons/Buttons';
import AuthWindow from '../AuthWindow/AuthWindow';
import styles from './AccountControl.module.css';
import config from '../../config.json';

function AccountControl() {
  const { userState } = useContext(userContext);
  const avatarUrl = userState.isAuthorized ? userState.user.avatarUrl : `${config.apiUrl}/files/avatars/avatar.png`;

  const [isShowButton, setIsShowButton] = useState(false);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);

  const onHover = () => {
    if (userState.isAuthorized) setIsShowButton(true);
  };
  const onHoverOut = () => {
    setIsShowButton(false);
  };

  const avatarClick = () => {
    setIsAvatarClicked(true);
    setIsShowButton(false);
  };
  const hideAuthWin = () => {
    setIsAvatarClicked(false);
  };

  return (
    <div className={styles.profileElement} onMouseLeave={onHoverOut}>
      <div className={styles.avatarWrapper}>
        <input className={styles.avatar} type="image" aria-label="avatar" src={avatarUrl} onClick={avatarClick} onMouseEnter={onHover} />
      </div>

      {(userState.isAuthorized && isShowButton)
        && <LogOutButton />}

      {(!userState.isAuthorized && isAvatarClicked)
        && <AuthWindow hideFunction={hideAuthWin} />}
    </div>
  );
}

export default AccountControl;
