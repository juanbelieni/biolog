import Link from 'next/link';
import React from 'react';

import styles from './Header.module.scss';

interface User {
  id: number;
  email: string;
  name: string;
}

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.headerLeft}>
        <Link href="/">
          <img src="/logo.svg" alt="logo" />
        </Link>

        <div className={styles.headerNav}>
          <Link href="/borboletas">
            <a>Borboletas</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
