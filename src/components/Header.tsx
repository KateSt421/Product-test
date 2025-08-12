import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>🛍️ My Products App</div>

        <nav className={styles.nav}>
          <Link to="/products" className={styles.navLink}>Products</Link>
          <Link to="/create-product" className={styles.navLink}>Create</Link>
        </nav>

        <div className={styles.apiInfo}>
          <a
            href="https://fakestoreapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.apiButton}
          >
            Public API is used
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;