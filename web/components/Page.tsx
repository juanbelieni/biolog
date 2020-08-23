import Head from 'next/head';
import React from 'react';

import Header from './Header';
import styles from './Page.module.scss';

interface Props {
  title?: string;
}

const Page: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title === '' ? `${title} | BioLog` : 'BioLog'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Page;
