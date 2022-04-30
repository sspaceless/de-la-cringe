import React from 'react';
import AccountControl from '../AccountControl/AccountControl';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="fullLogo.svg" alt="logo" />

      <AccountControl />

      <hr className={styles.breaker} />
    </header>
  );
}

export default Header;
