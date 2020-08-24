import { GetStaticProps } from 'next';
import React from 'react';
import ModalImage from 'react-modal-image';

import Page from '../../components/Page';
import api from '../../services/api';
import styles from './index.module.scss';

interface Image {
  id: number;
  name: string;
  url: string;
  user: {
    name: string;
  };
}

interface Props {
  images: Image[];
}

const Gallery: React.FC<Props> = ({ images }) => {
  return (
    <Page title="Galeria">
      <h1 className={styles.title}>Galeria</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className={styles.gallery}>
        {images.map((image) => (
          <ModalImage
            className={styles.image}
            key={image.id}
            small={image.url}
            large={image.url}
            alt={image.name}
          />
        ))}
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await api.get('/image');

  return {
    props: {
      images: response.data,
    },
  };
};

export default Gallery;
