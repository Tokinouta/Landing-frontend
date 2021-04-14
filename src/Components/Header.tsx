import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <Link to="" className={styles.container}>
      Home
    </Link>
  );
};
