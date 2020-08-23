import Head from 'next/head';
import React from 'react';

import styles from './AuthPage.module.scss';

interface Props {
  title: string;
  greeting: string;
  description: string;
}

const AuthPage: React.FC<Props> = ({
  title,
  greeting,
  description,
  children,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.information}>
        <div className={styles.content}>
          <h1>{greeting}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section>
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
};

export default AuthPage;
