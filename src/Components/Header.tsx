import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.links}>
        实时仿真
      </Link>
      <div className={styles['right-panel']}>
        <Link to="history" className={styles['right-panel-item']}>
          历史记录
        </Link>
        <Link to="init" className={styles['right-panel-item']}>
          初始参数
        </Link>
        <Link to="config" className={styles['right-panel-item']}>
          仿真配置
        </Link>
        <Link to="failure" className={styles['right-panel-item']}>
          故障诊断
        </Link>
      </div>
    </div>
  );
};
