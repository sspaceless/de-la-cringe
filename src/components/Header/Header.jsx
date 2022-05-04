import React from 'react';
import AccountControl from '../AccountControl/AccountControl';
import styles from './Header.module.css';
import config from '../../config.json';

function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={`${config.apiUrl}/files/fullLogo.svg`} alt="logo" />

      <AccountControl />

      <hr className={styles.breaker} />
    </header>
  );
}

export default Header;
