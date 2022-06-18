import React, { useContext, useState } from 'react';
import userContext from '../userContext';
import { LogOutButton } from '../Buttons/Buttons';
import AuthWindow from '../AuthWindow/AuthWindow';
import styles from './AccountControl.module.css';
import Config from '../../config';

function AccountControl() {
  const { userState } = useContext(userContext);
  const avatar = userState.isAuthorized ? userState.user.avatar : `${Config.API_URL}/files/avatar.png`;

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
        <input className={styles.avatar} type="image" aria-label="avatar" src={avatar} onClick={avatarClick} onMouseEnter={onHover} />
      </div>

      {(userState.isAuthorized && isShowButton)
        && <LogOutButton />}

      {(!userState.isAuthorized && isAvatarClicked)
        && <AuthWindow hideFunction={hideAuthWin} />}
    </div>
  );
}

export default AccountControl;
