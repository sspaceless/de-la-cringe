import React from 'react';
import AccountControl from '../AccountControl/AccountControl';
import styles from './Header.module.css';
import Config from '../../config';

function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={`${Config.API_URL}/files/fullLogo.svg`} alt="logo" />

      <AccountControl />

      <hr className={styles.breaker} />
    </header>
  );
}

export default Header;
