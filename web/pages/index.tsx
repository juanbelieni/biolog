import React from 'react';

import Button from '../components/Button';
import Page from '../components/Page';
import styles from './index.module.scss';

export default function Home() {
  return (
    <Page>
      <section className={styles.aboutUs}>
        <div>
          <h1 className={styles.title}>
            Espécies de <br />
            <b>borboletas</b> em <br />
            Minas Gerais
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button>Leia mais</Button>
        </div>
        <img src="/borboleta.png" />
      </section>
    </Page>
  );
}
