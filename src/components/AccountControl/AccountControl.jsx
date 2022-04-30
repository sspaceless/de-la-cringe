import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import userContext from '../userContext';
import { LogOutButton } from '../Buttons/Buttons';
import AuthWindow from '../AuthWindow/AuthWindow';
import styles from './AccountControl.module.css';

function AccountControl() {
  const { userState } = useContext(userContext);
  const avatarUrl = userState.isAuthorized ? userState.user.avatarUrl : 'avatar.png';

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
        && ReactDOM.createPortal(<AuthWindow hideFunction={hideAuthWin} />, document.getElementById('root'))}
    </div>
  );
}

export default AccountControl;
