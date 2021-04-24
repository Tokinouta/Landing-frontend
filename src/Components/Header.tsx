import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.links}>
        Home
      </Link>
      <div className={styles['right-panel']}>
        <Link to="history" className={styles['right-panel-item']}>
          History
        </Link>
        <div className={styles['right-panel-item']}>rara</div>
        <div className={styles['right-panel-item']}>rarararara</div>
      </div>
    </div>
  );
};
