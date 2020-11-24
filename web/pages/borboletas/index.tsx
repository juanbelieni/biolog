import { GetStaticProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Page from '../../components/Page';
import { Butterfly, getAllButterflies } from '../../services/airtable';
import styles from './index.module.scss';

interface Image {
  id: number;
  name: string;
  url: string;
  createdAt: string;
}

interface Props {
  butterflies: Butterfly[];
}

const ButterfliesPage: React.FC<Props> = ({ butterflies }) => {
  const [families, setFamilies] = useState<string[]>([]);
  const [selectedFamily, setSelectedFamily] = useState('all');

  useEffect(() => {
    const families = [];
    butterflies.forEach(({ family }) => {
      if (!families.includes(family)) {
        families.push(family);
      }
    });
    setFamilies(families);
  }, []);

  return (
    <Page title="Borboletas">
      <h1 className={styles.title}>Borboletas</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <select
        className={styles.butterfliesFamilyFilter}
        value={selectedFamily}
        onChange={(event) => setSelectedFamily(event.target.value)}
      >
        <option value="all">Todas as famílias</option>
        {families.map((family) => (
          <option value={family}>{family}</option>
        ))}
      </select>

      <div className={styles.butterfliesGrid}>
        {butterflies
          .filter(
            ({ family }) =>
              selectedFamily === 'all' || selectedFamily === family
          )
          .map((butterfly) => (
            <div key={butterfly.id} className={styles.butterflyCard}>
              <Image
                src={butterfly.image}
                alt={butterfly.name}
                width="300px"
                height="200px"
                objectFit="cover"
              />
              <div className={styles.butterflyCardText}>
                <p className={styles.butterflyName}>{butterfly.name}</p>

                <p className={styles.butterflyCardLabel}>Família:</p>
                <p className={styles.butterflyCardInformation}>
                  {butterfly.family}
                </p>

                <p className={styles.butterflyCardLabel}>Nome popular:</p>
                <p className={styles.butterflyCardInformation}>
                  {butterfly.popularName}
                </p>

                <p className={styles.butterflyCardLabel}>Descrição:</p>
                <p className={styles.butterflyCardInformation}>
                  {butterfly.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const butterflies = await getAllButterflies();

  return {
    props: {
      butterflies,
    },
    revalidate: 60,
  };
};

export default ButterfliesPage;
