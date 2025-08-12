import React from 'react';
import styles from '../assets/styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>
          Created by <span className={styles.name}>Katsiaryna Stankevich</span>
          <span className={styles.copyright}> © 2025</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
