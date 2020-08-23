import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import useToken from '../hooks/useToken';
import api from '../services/api';
import Button from './Button';
import styles from './Header.module.scss';

interface User {
  id: number;
  email: string;
  name: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const { token } = useToken();
  const { data: user } = useSWR(token ? '/user/profile' : null, async (url) => {
    const response = await api.get<User>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  function redirectToLogin() {
    router.push('/auth/login');
  }

  return (
    <header className={styles.container}>
      <div className={styles.headerLeft}>
        <Link href="/">
          <img src="/logo.svg" alt="logo" />
        </Link>

        <div className={styles.headerNav}>
          <Link href="/gallery">
            <a>Galeria</a>
          </Link>
          <Link href="">
            <a>Trabalhos</a>
          </Link>
        </div>
      </div>

      <div className={styles.headerRight}>
        {user?.name ? (
          <p>{user.name}</p>
        ) : (
          <Button onClick={redirectToLogin}>Login</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
