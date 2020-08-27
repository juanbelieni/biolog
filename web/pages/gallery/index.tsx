import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import ModalImage from 'react-modal-image';

import Button from '../../components/Button';
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
  const router = useRouter();

  function navigateToToUploadImage() {
    router.push('/gallery/upload');
  }

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
            hideDownload
          />
        ))}
        <Button onClick={navigateToToUploadImage}>
          <FiPlus />
        </Button>
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
    revalidate: 1,
  };
};

export default Gallery;
