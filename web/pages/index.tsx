import { useRouter } from 'next/router';
import React from 'react';

import Button from '../components/Button';
import Page from '../components/Page';
import styles from './index.module.scss';

export default function Home() {
  const router = useRouter();
  return (
    <Page>
      <section className={styles.aboutUs}>
        <div>
          <h1 className={styles.title}>
            Espécies de <b>lepidopteras</b> no Brasil
          </h1>
          <p className={styles.description}>
            A ordem lepidoptera é composta por diversas espécies de{' '}
            <b>borboletas</b> e <b>mariposas</b>, que formam a segunda maior
            diversidade de insetos do planeta. Os lepidópteros são encontrados
            em várias áreas do mundo, sobretudo em locais tropicais.
          </p>
          <Button onClick={() => router.push('/borboletas')}>
            Conheça as borboletas
          </Button>
        </div>
        <img src="/borboleta.png" />
      </section>
    </Page>
  );
}
